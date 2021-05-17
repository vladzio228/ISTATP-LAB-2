const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    minLength: [2, 'A name must be longer, than 2 symbols'],
    maxLength: [50, 'A name must be shorter, than 50 symbols'],
  },
  contacts: {
    type: String,
    minLength: [4, 'A contacts must be longer, than 4 symbols'],
    maxLength: [500, 'A contacts must be shorter, than 500 symbols'],
  },
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
    },
  ],
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'orders',
    select: '-__v -customer',
  });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
