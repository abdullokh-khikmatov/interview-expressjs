const Express = require("express");
const app = new Express();
require("dotenv").config();
const router = require("./routes");
const db = require("./utils/mongodb/mongodb");

//port
const port = process.env.PORT;

//database
db();

//middlewares
app.use(Express.json());

//router
app.use(router);

app.listen(port, console.log(`port is running on port ${port}`));
