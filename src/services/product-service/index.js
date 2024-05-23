require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productRoutes = require('./routes/product.routes');
const rabbitmqConfig = require('../../config/rabbitmq.config');
const amqplib = require('amqplib');

const app = express();
const PORT = process.env.PRODUCT_SERVICE_PORT || 3002;

console.count("env product : ",process.env.PRODUCT_SERVICE_PORT);
// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// RabbitMQ connection
let rabbitmqChannel;
const connectToRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect(rabbitmqConfig.url);
    rabbitmqChannel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
};

connectToRabbitMQ();

// Start server
app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});