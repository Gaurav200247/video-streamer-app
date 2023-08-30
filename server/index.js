// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "server/.env" });
}

require("express-async-errors");

// -------------security packages-------------
const cors = require("cors");

// Simple Imports
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const connectDB = require("./db/connectDB");
const notFoundMiddleware = require("./Middlewares/notFound");
const errHandlerMiddleware = require("./Middlewares/errHandler");
const videosRouter = require("./Routers/videosRouters");
const userRouter = require("./Routers/UserRouters");

const app = express();

//  CORS
// "https://video-streamer-app-frontend.vercel.app"
// http://localhost:3000

// // Use the CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://video-streamer-app-frontend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// middlewares
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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
