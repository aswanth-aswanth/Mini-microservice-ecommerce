const amqplib = require("amqplib");
const rabbitmqConfig = require("../config/rabbitmq.config");
const Product = require("../../../db/models/product.model");
const { sendMessage } = require("../../../rabbitmq/producer");

const consumeProductMessages = async () => {
  try {
    const connection = await amqplib.connect(rabbitmqConfig.url);
    const channel = await connection.createChannel();

    await channel.assertQueue("check_product_quantity", { durable: true });

    console.log(
      "Product consumer listening for messages in check_product_quantity"
    );

    channel.consume("check_product_quantity", async (message) => {
      if (message !== null) {
        const { orderId, productId, quantity } = JSON.parse(
          message.content.toString()
        );
        console.log("Received message from check_product_quantity:", {
          orderId,
          productId,
          quantity,
        });

        // Check product quantity
        const product = await Product.findById(productId);
        if (product && product.qty >= quantity) {
          // Decrease the product quantity
          product.qty -= quantity;
          await product.save();

          // Send confirmation message
          await sendMessage("order_update_status", {
            orderId,
            status: "completed",
          });
        } else {
          // Send cancellation message
          await sendMessage("order_update_status", {
            orderId,
            status: "cancelled",
          });
        }

        channel.ack(message); // Acknowledge the message
      }
    });
  } catch (error) {
    console.error("Error consuming product messages from RabbitMQ:", error);
    throw error; // Propagate the error to handle it upstream
  }
};

module.exports = { consumeProductMessages };
