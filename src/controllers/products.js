const { BatchesSchema, ProductSchema } = require("../model/model");

class Products {
  // add batches = POST
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

  //sell products = POST

  async SELL(req, res) {
    try {
      let { id, count } = req.body;
      let total = 0;
      const data = await BatchesSchema.find({ product_id: id });

      for (let i = 0; i < data.length; i++) {
        total += data[i].count;
      }

      if (total < count) {
        res.status(400).json({
          message: "product count is not enough",
        });
      } else {
        for (let i = 0; count > 0; i++) {
          if (count <= data[i].count) {
            let b = await BatchesSchema.find({ product_id: id });
            const newCount = b[i].count - count;
            count = 0;

            await BatchesSchema.findOneAndUpdate(
              { _id: b[i]._id },
              { $set: { count: newCount } }
            );
          } else if (count > data[i].count) {
            let b = await BatchesSchema.find({ product_id: id });
            count = count - b[i].count;

            await BatchesSchema.findOneAndUpdate(
              { _id: b[i]._id },
              { $set: { count: 0 } }
            );
          }
        }
      }

      res.status(200).json({
        message: "ok",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
      });
    }
  }

  // left products = GET
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
