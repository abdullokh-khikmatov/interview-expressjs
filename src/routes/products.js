const Router = require("express");
const router = new Router();
const products = require("../controllers/products");

router.get("/left", products.GET);
router.post("/add", products.POST);

module.exports = router;
