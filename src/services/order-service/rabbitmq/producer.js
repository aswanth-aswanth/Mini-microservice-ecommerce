const amqplib = require('amqplib');
const rabbitmqConfig = require('../config/rabbitmq.config');

const sendMessage = async (queue, message) => {
  try {
    const connection = await amqplib.connect(rabbitmqConfig.url);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });

    const messageBuffer = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(queue, messageBuffer);

    console.log(`Message sent to ${queue}:`, message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error sending message to RabbitMQ:', error);
    throw error; // Propagate the error to handle it upstream
  }
};

module.exports = { sendMessage };
