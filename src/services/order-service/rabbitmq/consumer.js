const amqplib = require('amqplib');
const rabbitmqConfig = require('../config/rabbitmq.config');
const Order = require('../models/order.model');

const consumeOrderMessages = async () => {
  try {
    const connection = await amqplib.connect(rabbitmqConfig.url);
    const channel = await connection.createChannel();

    await channel.assertQueue('order_update_status', { durable: true });

    console.log('Order consumer listening for messages in order_update_status');

    channel.consume('order_update_status', async (message) => {
      if (message !== null) {
        const { orderId, status } = JSON.parse(message.content.toString());
        console.log('Received message from order_update_status:', { orderId, status });

        // Update order status
        await Order.findByIdAndUpdate(orderId, { status });

        channel.ack(message); // Acknowledge the message
      }
    });
  } catch (error) {
    console.error('Error consuming order messages from RabbitMQ:', error);
    throw error; // Propagate the error to handle it upstream
  }
};

module.exports = { consumeOrderMessages };