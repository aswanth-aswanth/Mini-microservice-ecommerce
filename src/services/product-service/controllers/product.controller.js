const Product = require('../../../db/models/product.model');
const { sendMessage } = require('../../../rabbitmq/producer');
const productCreatedEvent = require('../../../events/product-events/product-created.event');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
    });
    const savedProduct = await newProduct.save();

    // Emit product_created event
    productCreatedEvent.emit('product_created', savedProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};