const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const notificationRoutes = require('./routes/notification.routes');
const { connectRabbitMQ } = require('../../rabbitmq/consumer');

require('dotenv').config();

const app = express();
const PORT = process.env.NOTIFICATION_SERVICE_PORT || 5005;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// RabbitMQ connection
connectRabbitMQ();

app.use('/notifications', notificationRoutes);

app.listen(PORT, () => {
    console.log(`Notification Service is running on port ${PORT}`);
});
