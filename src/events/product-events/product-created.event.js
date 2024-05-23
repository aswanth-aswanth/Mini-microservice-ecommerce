const { sendMessage } = require('../../rabbitmq/producer');

const productCreatedEvent = async (product) => {
  try {
    await sendMessage('product_created', product);
  } catch (error) {
    console.error('Error sending product created event:', error);
  }
};

module.exports = productCreatedEvent;