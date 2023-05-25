const express = require("express");

const {
  Register,
  LogIn,
  LogOut,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserDetails,
  updateUserPass,
  updateUserSettings,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getSingleUser,
  addToWishlist,
} = require("../Controllers/userController");

const { authMiddleware, authRoles } = require("../Middlewares/auth");
const { avatarUpload } = require("../Middlewares/multer");
// const multer = require("multer");

const router = express.Router();

router.route("/register").post(avatarUpload, Register);
router.route("/login").post(LogIn);
router.route("/logOut").get(LogOut);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:resetToken").patch(resetPassword);

// ----------logged in Routes----------
router.route("/me").get(authMiddleware, getUserDetails);

router.route("/me/update").put(authMiddleware, avatarUpload, updateUserDetails);

router.route("/me/update/password").put(authMiddleware, updateUserPass);
router.route("/me/update/settings").put(authMiddleware, updateUserSettings);

router.route("/me/addtowishlist").put(authMiddleware, addToWishlist);

// ----------Admin Routes----------
router
  .route("/admin/users")
  .get(authMiddleware, authRoles("admin"), getAllUsers);

router
  .route("/admin/users/get/:id")
  .get(authMiddleware, authRoles("admin"), getSingleUser);

router
  .route("/admin/users/update/:id")
  .put(authMiddleware, authRoles("admin"), updateUserRole);

router
  .route("/admin/users/delete/:id")
  .delete(authMiddleware, authRoles("admin"), deleteUser);

module.exports = router;
