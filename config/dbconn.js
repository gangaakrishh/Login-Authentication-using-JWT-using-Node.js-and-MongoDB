const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const Connect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_DB);
    console.log(`Database Connected `);
  } catch (error) {
    console.log(error);
  }
};
module.exports = Connect;
