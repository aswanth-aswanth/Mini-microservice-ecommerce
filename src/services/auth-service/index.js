require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");
const rabbitmqConfig = require("../../config/rabbitmq.config");
const amqplib = require("amqplib");

const app = express();
const PORT = process.env.AUTH_SERVICE_PORT || 3000;

console.count("env auth : ", process.env.AUTH_SERVICE_PORT);
// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
require("../../db");

// Routes
app.use("/api/auth", authRoutes);

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

// Start server
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
