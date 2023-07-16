const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose
    .set("strictQuery", true)
    .connect(url)
    .then(() => console.log("db connected"))
    .catch((err) => {
      console.log(err, "db connection failed !!");
    });
};

module.exports = connectDB;
