// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "server/.env" });
}

require("express-async-errors");

// -------------security packages-------------
const cors = require("cors");
const helmet = require("helmet");
// const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");

// Simple Imports
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const express = require("express");
const app = express();
const connectDB = require("./db/connectDB");
const notFoundMiddleware = require("./Middlewares/notFound");
const errHandlerMiddleware = require("./Middlewares/errHandler");
const videosRouter = require("./Routers/videosRouters");
const userRouter = require("./Routers/UserRouters");
// const path = require("path");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Extra Packages for api security

// http://localhost:3000
// https://video-streamer-app-frontend.vercel.app

// cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header("Origin"));
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(helmet());
app.use(xss());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use(cookieParser()); //used to parse cookies

// routes
app.use("/api/v1", videosRouter);
app.use("/api/v1", userRouter);

// build Routes

// app.use(express.static(path.join(__dirname, "../client/build")));

// console.log(path.join(__dirname, "../client/build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
// });

// simple route
app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

// custom-middlewares
app.use(notFoundMiddleware);
app.use(errHandlerMiddleware);

// app listening
const PORT = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}... at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(error);
  }
};

// app start
start();
