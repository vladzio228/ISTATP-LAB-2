const User = require('../models/userModel');
const Order = require('../models/orderModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOrder = catchAsync(async (req, res, next) => {
  const doc = await Order.create(req.body);
  await User.findByIdAndUpdate(req.body.customer, {
    $push: { orders: doc._id },
  });
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const doc = await Order.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  await User.findByIdAndUpdate(doc.customer, {
    $pull: { orders: doc._id },
  });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
