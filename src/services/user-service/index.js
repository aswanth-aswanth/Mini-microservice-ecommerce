const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const rabbitmqConfig = require("../../config/rabbitmq.config");
const amqplib = require("amqplib");
require("dotenv").config();

const app = express();
const PORT = process.env.USER_SERVICE_PORT || 3001;
// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
require("../../db");

// Routes
app.use("/users", userRoutes);

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
  console.log(`User service running on port ${PORT}`);
});
