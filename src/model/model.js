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

const soldProducts = new mongoose.Schema({
  product_id: String,
  name: String,
  batch_id: String,
  price: Number,
  sold_count: Number,
  sold_date: Number,
});

const products = mongoose.model("products", ProductSchema);
const batches = mongoose.model("batches", batchesSchema);
const sold = mongoose.model("sold", soldProducts);

module.exports.ProductSchema = products;

module.exports.BatchesSchema = batches;

module.exports.SoldProducts = sold;
