const Router = require("express");
const router = new Router();
const products = require("../controllers/stock");

router.get("/left", products.GET);
router.post("/add", products.POST);
router.post("/sell", products.SELL);
router.get("/sold", products.SOLD);

module.exports = router;
