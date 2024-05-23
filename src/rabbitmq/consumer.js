const amqplib = require('amqplib');
const rabbitmqConfig = require('../config/rabbitmq.config');

const consumeMessages = async (queue, callback) => {
  try {
    const connection = await amqplib.connect(rabbitmqConfig.url);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });

    console.log(`Waiting for messages in ${queue}...`);

    channel.consume(queue, (message) => {
      const receivedMessage = JSON.parse(message.content.toString());
      callback(receivedMessage);

      channel.ack(message);
    });
  } catch (error) {
    console.error('Error consuming messages from RabbitMQ:', error);
  }
};

module.exports = { consumeMessages };