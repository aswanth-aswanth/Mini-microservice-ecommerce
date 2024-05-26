const express = require("express");
const orderRoutes = require("./routes/order.routes");
const cors = require("cors");
const morgan = require("morgan");
const rabbitmqConfig = require("./config/rabbitmq.config");
const amqplib = require("amqplib");
require("dotenv").config();
const { consumeOrderMessages } = require("./rabbitmq/consumer");

const app = express();
const PORT = process.env.ORDER_SERVICE_PORT || 5003;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
require("./db");

app.use("/orders", orderRoutes);

let rabbitmqChannel;
const MAX_RETRIES = 5; // Maximum number of retries
const connectToRabbitMQ = async () => {
  let retryCount = 0;
  const interval = 1000; // Delay between retries in milliseconds

  while (retryCount <= MAX_RETRIES) {
    try {
      const connection = await amqplib.connect(rabbitmqConfig.url);
      rabbitmqChannel = await connection.createChannel();
      console.log("Connected to RabbitMQ");
      return; // Exit the function once connected
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
      retryCount++;
      if (retryCount <= MAX_RETRIES) {
        console.log(`Retrying connection to RabbitMQ... Attempt ${retryCount}`);
        await new Promise((resolve) =>
          setTimeout(resolve, interval * Math.pow(2, retryCount))
        ); // Exponential backoff
      } else {
        throw new Error("Failed to connect to RabbitMQ after max retries");
      }
    }
  }
};

connectToRabbitMQ()
  .then(() => {
    app.listen(PORT, () => {
      consumeOrderMessages();
      console.log(`Order service running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Initialization failed:", error);
  });
