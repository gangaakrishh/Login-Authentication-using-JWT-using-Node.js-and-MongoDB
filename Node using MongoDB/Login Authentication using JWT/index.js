const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const Connect = require("./config/dbconn");
const routes = require("./routes");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
app.use(bodyParser.json());
Connect();

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
routes.forEach((item) => {
  app.use(item.route, item.router);
});

app.use(notFound);
app.use(errorHandler);