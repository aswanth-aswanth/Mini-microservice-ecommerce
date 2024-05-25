const express = require('express');
const reviewRoutes = require('./routes/review.routes');
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const rabbitmqConfig = require("../../config/rabbitmq.config");
const amqplib = require("amqplib");
require('dotenv').config();


const app = express();
const PORT = process.env.REVIEW_SERVICE_PORT || 5006;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
require("../../db");

// Routes
app.use('/reviews', reviewRoutes);

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


app.listen(PORT, () => {
    console.log(`Review Service is running on port ${PORT}`);
});
