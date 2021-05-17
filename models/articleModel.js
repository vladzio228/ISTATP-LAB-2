const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'There is text?'],
    minLength: [4, 'A text must be longer, than 4 symbols'],
    maxLength: [5000, 'A text must be shorter, than 5000 symbols'],
  },
  header: {
    type: String,
    required: [true, 'There is header?'],
    minLength: [4, 'A header must be longer, than 4 symbols'],
    maxLength: [100, 'A header must be shorter, than 100 symbols'],
  },
});

const Article = mongoose.model('Email', articleSchema);

module.exports = Article;
