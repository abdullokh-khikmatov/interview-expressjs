const mongoose = require("mongoose");
const { BatchesSchema, ProductSchema } = require("../model/model");
const db = require("../utils/mongodb/mongodb");

class Products {
  async POST(req, res) {
    try {
      const { id, price, life, date, count } = req.body;

      const data = new BatchesSchema({
        product_id: id,
        price: price,
        expiration_date: life,
        date: date,
        count: count,
      });

      const row = await data.save();

      res.status(200).json({
        message: "ok",
        data: row,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async SELL(req, res) {
    try {
      let { id, count, price } = req.body;
      let total = 0;
      const data = await BatchesSchema.find({ product_id: id });

      for (let i = 0; i < data.length; i++) {
        total += data[i].count;
      }

      if (total < count) {
        res.status(400).json({
          message: "product count is not enough",
        });
      }

      for (let i = 0; count > 0; i++) {
        if (count < data[i].count) {
          async function a() {
            let b = await BatchesSchema.findById({ product_id: id });

            console.log(b);
            b.count = 1;

            b.save();
          }

          console.log(a());
          BatchesSchema.findOneAndUpdate(
            { _id: "623cb196deec6c9173f1e171" },
            { $set: { price } }
          );

          count = 0;
        }
      }

      res.status(200).json({
        message: "ok",
        data: "ok",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async GET(_, res) {
    try {
      const products = await ProductSchema.find({});
      const batches = await BatchesSchema.find({});
      const left_data = [];

      for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < batches.length; j++) {
          if (products[i]._id == batches[j].product_id) {
            console.log(batches[j]);
            const obj = {
              product_id: products[i]._id,
              product_name: products[i].product_name,
              batch_id: batches[j]._id,
              price: batches[j].price,
              expiration_date: batches[j].expiration_date,
              date: batches[j].date,
            };

            left_data.push(obj);
          }
        }
      }

      res.status(200).json({
        message: "products",
        data: left_data,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = new Products();
