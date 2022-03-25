const {
  BatchesSchema,
  ProductSchema,
  SoldProducts,
} = require("../model/model");

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
      const product = await ProductSchema.find({ _id: id });

      console.log(product);

      for (let i = 0; i < data.length; i++) {
        total += data[i].count;
      }

      //is enough checking
      if (total < count) {
        res.status(400).json({
          message: "product count is not enough",
        });
      } else {
        // calculate and update
        for (let i = 0; count > 0; i++) {
          if (count <= data[i].count) {
            const newCount = data[i].count - count;

            await BatchesSchema.findOneAndUpdate(
              { _id: data[i]._id },
              { $set: { count: newCount } }
            );

            const sold_product = new SoldProducts({
              product_id: id,
              name: product[0].product_name,
              batch_id: data[i]._id,
              price: data[i].price,
              sold_count: count,
              sold_date: Date.now(),
            });

            const row = await sold_product.save();
            count = 0;
          } else if (count > data[i].count) {
            await BatchesSchema.findOneAndUpdate(
              { _id: data[i]._id },
              { $set: { count: 0 } }
            );

            const sold_product = new SoldProducts({
              product_id: id,
              name: product[0].product_name,
              batch_id: data[i]._id,
              price: data[i].price,
              sold_count: data[i].count,
              sold_date: Date.now(),
            });
            const row = await sold_product.save();
            count = count - data[i].count;
          }
        }

        res.status(200).json({
          message: "ok",
        });
      }
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
        message: "ok",
        data: left_data,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  // sold products = GET

  async SOLD(_, res) {
    try {
      const sold_products = await SoldProducts.find({});

      res.status(200).json({
        message: "ok",
        data: sold_products,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = new Products();
