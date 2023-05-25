const express = require("express");
const { upload } = require("../Middlewares/multer");
const { authMiddleware, authRoles } = require("../Middlewares/auth");
const {
  TestpostVideo,
  TestStreamVideo,
  TestDeleteVideo,
  TestUpdateVideo,
} = require("../Controllers/TestController");
const router = express.Router();

router.route("/testing/:id").get(TestStreamVideo);

router.route("/testing/:videoId").delete(TestDeleteVideo);

router.route("/testing/:id").put(upload, TestUpdateVideo);

router
  .route("/testing")
  .post(authMiddleware, authRoles("admin"), upload, TestpostVideo);

module.exports = router;
