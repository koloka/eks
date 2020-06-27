const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  img_url: {
    type: Array,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  added_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model('Product', ProductSchema);

