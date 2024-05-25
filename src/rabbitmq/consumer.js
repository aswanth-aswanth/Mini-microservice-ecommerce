const amqplib = require('amqplib');
const rabbitmqConfig = require('../config/rabbitmq.config');
const Review = require('../models/review.model');

const consumeMessage = async (queue) => {
  try {
    const connection = await amqplib.connect(rabbitmqConfig.url);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });

    console.log(`Consumer listening for messages in ${queue}`);

    channel.consume(queue, async (message) => {
      if (message !== null) {
        const messageContent = JSON.parse(message.content.toString());
        console.log(`Received message from ${queue}:`, messageContent);

        // Example: Process the message (save to MongoDB)
        const newReview = new Review(messageContent);
        await newReview.save();

        channel.ack(message); // Acknowledge the message
      }
    });

  } catch (error) {
    console.error('Error consuming message from RabbitMQ:', error);
    throw error; 
  }
};

module.exports = { consumeMessage };
