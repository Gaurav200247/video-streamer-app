const express = require("express");
const router = express.Router();

const {
  getAllVideos,
  postVideo,
  updateVideo,
  deleteVideo,
  getSingleVideoDetails,
  // getSingleVideo,
  updateVideoViews,
  createVideoReview,
  getAllReviews,
  deleteReview,
  StreamContent,
} = require("../Controllers/videosConroller");
const { authMiddleware, authRoles } = require("../Middlewares/auth");
const { upload } = require("../Middlewares/multer");

// ------------------public routes------------------
router.route("/videos").get(getAllVideos);
router.route("/videos/:id").get(getSingleVideoDetails);
router.route("/content/:id").get(StreamContent);

// ------------------login Routes------------------
router.route("/videos/views/:id").put(authMiddleware, updateVideoViews);

// ------------------Private roues------------------
router
  .route("/videos")
  .post(authMiddleware, authRoles("admin"), upload, postVideo);

router
  .route("/videos/:id")
  .put(authMiddleware, authRoles("admin"), upload, updateVideo)
  .delete(authMiddleware, authRoles("admin"), deleteVideo);

module.exports = router;
