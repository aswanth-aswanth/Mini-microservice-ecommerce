const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const services = { 
  auth: 'http://auth-service:3000',  // Use the service name and port defined in Docker Compose
  order: 'http://order-service:5003',
  product: 'http://product-service:3002',
  review: 'http://review-service:5006',
  user: 'http://user-service:3001',
};

app.use('/auth', createProxyMiddleware({ target: services.auth, changeOrigin: true }));
app.use('/order', createProxyMiddleware({ target: services.order, changeOrigin: true }));
app.use('/product', createProxyMiddleware({ target: services.product, changeOrigin: true }));
app.use('/review', createProxyMiddleware({ target: services.review, changeOrigin: true }));
app.use('/user', createProxyMiddleware({ target: services.user, changeOrigin: true }));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
