const express = require("express");

const { authMiddleware, authRoles } = require("../Middlewares/auth");
const { avatarUpload } = require("../Middlewares/multer");

const Register = require("../Controllers/UserControllers/All_Users/Register");
const LogIn = require("../Controllers/UserControllers/All_Users/Login");
const LogOut = require("../Controllers/UserControllers/All_Users/Logout");
const ForgotPassword = require("../Controllers/UserControllers/All_Users/ForgotPassword");
const ResetPassword = require("../Controllers/UserControllers/All_Users/ResetPassword");
const LoadUser = require("../Controllers/UserControllers/User_Logged_In/LoadUser");
const UpdateUserDetails = require("../Controllers/UserControllers/User_Logged_In/UpdateUserDetails");
const UpdateUserPass = require("../Controllers/UserControllers/User_Logged_In/UpdatePassword");
const AddToWishlist = require("../Controllers/UserControllers/User_Logged_In/AddToWishList");
const GetAllUsers = require("../Controllers/UserControllers/Admin/GetAllUsers");
const GetSingleUser = require("../Controllers/UserControllers/Admin/GetSingleUser");
const UpdateUserRole = require("../Controllers/UserControllers/Admin/UpdateRoles");
const DeleteUser = require("../Controllers/UserControllers/Admin/DeleteUser");

const router = express.Router();

// ******************** All users Routes ********************

router.route("/register").post(avatarUpload, Register);

router.route("/login").post(LogIn);
router.route("/logOut").get(LogOut);

router.route("/password/forgot").post(ForgotPassword);
router.route("/password/reset/:resetToken").patch(ResetPassword);

// ******************** User Logged In Routes ********************
router.route("/me").get(authMiddleware, LoadUser);

router.route("/me/update").put(authMiddleware, avatarUpload, UpdateUserDetails);
router.route("/me/update/password").put(authMiddleware, UpdateUserPass);

router.route("/me/addtowishlist").put(authMiddleware, AddToWishlist);

// ----------Admin Routes----------
router
  .route("/admin/users")
  .get(authMiddleware, authRoles("admin"), GetAllUsers);

router
  .route("/admin/users/get/:id")
  .get(authMiddleware, authRoles("admin"), GetSingleUser);

router
  .route("/admin/users/update/:id")
  .put(authMiddleware, authRoles("admin"), UpdateUserRole);

router
  .route("/admin/users/delete/:id")
  .delete(authMiddleware, authRoles("admin"), DeleteUser);

module.exports = router;
