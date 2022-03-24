const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: String,
});

const batchesSchema = new mongoose.Schema({
  product_id: String,
  price: Number,
  expiration_date: Number,
  date: Number,
  count: Number,
});

const products = mongoose.model("products", ProductSchema);
const batches = mongoose.model("batches", batchesSchema);

module.exports.ProductSchema = products;

module.exports.BatchesSchema = batches;
