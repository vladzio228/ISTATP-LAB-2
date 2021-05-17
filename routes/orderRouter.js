const express = require('express');
const orderController = require('../controllers/orderController');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

const router = express.Router();
const checkForExistUser = catchAsync(async (req, res, next) => {
  const exist = await User.findById(req.body.customer);
  if (!exist) {
    return next(
      new AppError(
        'No user found with that ID. Please provide valid id in "customer',
        404
      )
    );
  }
  next();
});

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(checkForExistUser, orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
