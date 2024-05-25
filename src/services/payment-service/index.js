const express = require("express");
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/payment.routes");
const cors = require("cors");
const morgan = require("morgan");
const rabbitmqConfig = require("../../config/rabbitmq.config");
const amqplib = require("amqplib");
require("dotenv").config();
const app = express();
const PORT = process.env.PAYMENT_SERVICE_PORT || 5004;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
require("../../db");

app.use(bodyParser.json());

// RabbitMQ connection
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

app.use("/payments", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Payment Service is running on port ${PORT}`);
});
