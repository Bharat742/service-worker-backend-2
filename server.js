// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const webPush = require('web-push');
const path = require('path');

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// VAPID keys
const publicKey = process.env.PUBLICKEY;
const privateKey = process.env.PRIVATEKEY;

webPush.setVapidDetails(
  'mailto:bharatlal.kumar@technians.com',
  publicKey,
  privateKey
);

// Middleware
app.use(cors({ origin: '*', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(bodyParser.json());

// Routes
const subscribeRoute = require('./routes/subscribe');
const notifyRoute = require('./routes/notify');

app.use('/subscribe', subscribeRoute);
app.use('/sendNotification', notifyRoute);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ DB connection error:', err));
