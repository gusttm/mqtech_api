// Corresponde ao Model Product.ts no front

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
  ProductCode: {
    type: Number,
    required: true
  },
  ProductName: {
    type: String,
    required: true
  },
  ProductQnt: {
    type: Number,
    required: true
  },
  ProductUnit: {
    type: String,
    required: true
  }
},{
    collection: 'Product'
});

module.exports = mongoose.model('Product', Product);