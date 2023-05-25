const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose
    .set("strictQuery", true)
    .connect(url)
    .then(() => console.log("db connected"))
    .catch(() => console.log("db connection failed !!"));
};

module.exports = connectDB;
