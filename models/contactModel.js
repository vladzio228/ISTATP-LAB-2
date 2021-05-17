const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  description: {
    type: String,
    minLength: [1, 'A Ingredient name must be longer, than 1 symbol'],
    maxLength: [
      500,
      'A description must be shorter, than 500 symbols',
    ],
  },
  text: {
    type: String,
    required: [true, 'There is text?'],
    minLength: [1, 'A text must be longer, than 1 symbols'],
    maxLength: [10000, 'A text must be shorter, than 10000 symbols'],
  },
});

const Contact = mongoose.model('Contact', contactsSchema);

module.exports = Contact;
