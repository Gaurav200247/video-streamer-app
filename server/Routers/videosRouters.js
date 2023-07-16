const express = require("express");
const router = express.Router();

const GetAllVideos = require("../Controllers/VideoControllers/GetAllVideos");
const PostVideo = require("../Controllers/VideoControllers/PostVideo");
const GetSingleVideoDetails = require("../Controllers/VideoControllers/GetSingleVideoDetails");
const UpdateVideo = require("../Controllers/VideoControllers/UpdateVideo");
const UpdateVideoViews = require("../Controllers/VideoControllers/UpdateVideoViews");
const DeleteVideo = require("../Controllers/VideoControllers/DeleteVideo");

const { authMiddleware, authRoles } = require("../Middlewares/auth");
const { upload } = require("../Middlewares/multer");

// ------------------public routes------------------
router.route("/videos").get(GetAllVideos);
router.route("/videos/:id").get(GetSingleVideoDetails);

// ------------------login Routes------------------
router.route("/videos/views/:id").put(authMiddleware, UpdateVideoViews);

// ------------------Private roues------------------
router
  .route("/videos")
  .post(authMiddleware, authRoles("admin"), upload, PostVideo);

router
  .route("/videos/:id")
  .put(authMiddleware, authRoles("admin"), upload, UpdateVideo)
  .delete(authMiddleware, authRoles("admin"), DeleteVideo);

module.exports = router;
