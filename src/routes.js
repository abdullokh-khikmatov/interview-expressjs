const Router = require("express");
const router = new Router();
const products = require("./routes/stock");

router.use("/stock", products);

module.exports = router;
