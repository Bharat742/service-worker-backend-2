const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, unique: true },
  expirationTime: Date,
  keys: {
    p256dh: String,
    auth: String
  }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
