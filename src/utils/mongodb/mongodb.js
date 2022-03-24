const mongoose = require("mongoose");
require("dotenv").config();

const db = function () {
  mongoose.connect(`${process.env.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = db;
