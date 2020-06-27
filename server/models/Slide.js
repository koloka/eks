const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlideSchema = new Schema({
  url: {
    type: String,
    required: true
  }
});

module.exports = Slide = mongoose.model('Slide', SlideSchema);

