const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const Connect = require("./config/dbconn");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
Connect();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
});


//Routers
const userRouter = require("./routes/UserRoutes");


//Routes
app.use("/api/users", userRouter);


app.use(notFound);
app.use(errorHandler);