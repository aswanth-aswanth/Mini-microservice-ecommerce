const express = require("express");
const orderRoutes = require("./routes/order.routes");
const cors = require("cors");
const morgan = require("morgan");
const rabbitmqConfig = require("../../config/rabbitmq.config");
const amqplib = require("amqplib");
require("dotenv").config();


const app = express();
const PORT = process.env.ORDER_SERVICE_PORT || 5003;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
require("../../db");

app.use("/orders", orderRoutes);

let rabbitmqChannel;
const connectToRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect(rabbitmqConfig.url);
    rabbitmqChannel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
};

connectToRabbitMQ();

app.listen(PORT, () => {
  console.log(`Order Service is running on port ${PORT}`);
});
