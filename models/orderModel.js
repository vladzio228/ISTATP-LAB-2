const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  text: {
    type: String,
    required: [true, 'Order should have text'],
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'customer',
    select: '-__v -orders',
  });
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
