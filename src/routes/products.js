const Router = require("express");
const router = new Router();
const products = require("../controllers/products");

router.get("/left", products.GET);
router.post("/add", products.POST);
router.post("/sell", products.SELL);

module.exports = router;
