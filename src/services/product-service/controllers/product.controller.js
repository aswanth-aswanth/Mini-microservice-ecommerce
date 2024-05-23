// Mock product data
let products = [
    { id: 1, name: 'Product 1', price: 9.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
  ];
  
  exports.getAllProducts = (req, res) => {
    res.status(200).json(products);
  };
  
  exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((product) => product.id === productId);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    res.status(200).json(product);
  };
  
  exports.createProduct = (req, res) => {
    const { name, price } = req.body;
  
    const newProduct = {
      id: products.length + 1,
      name,
      price,
    };
  
    products.push(newProduct);
  
    res.status(201).json(newProduct);
  };