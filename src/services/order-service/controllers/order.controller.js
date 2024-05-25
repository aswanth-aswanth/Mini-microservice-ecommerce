const Order = require('../models/order.model');
const { sendMessage } = require('../../../rabbitmq/producer');

exports.createOrder = async (req, res) => {
  const { productId, userId, quantity } = req.body;

  try {
    // Create order with pending status
    const order = new Order({ productId, userId, quantity, status: 'pending' });
    const savedOrder = await order.save();

    // Send message to RabbitMQ to check product quantity
    await sendMessage('check_product_quantity', { orderId: savedOrder._id, productId, quantity });

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
