const Router = require("express");
const router = new Router();
const products = require("./routes/products");

router.use("/stock", products);

module.exports = router;
