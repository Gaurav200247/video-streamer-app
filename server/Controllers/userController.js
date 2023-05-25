const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;

const customAPIError = require("../Errors/CustomAPIError");
const User = require("../Models/UsersModel");
const SendMail = require("../Utils/SendMail");
const SendToken = require("../Utils/SendToken");

//-------User Register-------
const Register = async (req, res) => {
  const { name, email, password } = req.body;
  const avatar = req.file;

  console.log(req.body);
  console.log(avatar);

  // checking for existing username
  const user = await User.findOne({ user_name: name });

  if (user) {
    throw new customAPIError(
      "The user with that username already exist!!",
      StatusCodes.BAD_REQUEST
    );
  }

  if (!req.file) {
    throw new customAPIError(
      "Please choose an Avatar",
      StatusCodes.BAD_REQUEST
    );
  }

  const createUser = await User.create({
    user_name: name,
    email,
    password,
    avatar: {
      public_id: avatar.filename,
      url: avatar.path,
    },
  });

  SendToken(res, createUser, StatusCodes.CREATED);
};

//-------User Login-------
const LogIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new customAPIError(
      "Invalid Email or Password",
      StatusCodes.UNAUTHORIZED
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new customAPIError(
      "Invalid Email or Password",
      StatusCodes.UNAUTHORIZED
    );
  }

  let isPassMatch = await user.comparePasswords(password);

  if (!isPassMatch) {
    throw new customAPIError("Invalid Credentials", StatusCodes.UNAUTHORIZED);
  }

  SendToken(res, user, StatusCodes.OK);
};

//-------Load User-------
const getUserDetails = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(StatusCodes.OK).json({ success: true, user });
};

//-------User LogOut-------
const LogOut = async (req, res) => {
  res.cookie("userToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Logged Out Successfully !!" });
};

//-------User Forgot Password-------
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new customAPIError("User not Found !!", StatusCodes.NOT_FOUND);
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: true });

  const resetPassURL = `http://localhost:3000/password/reset/${resetToken}`;

  const EmailMsg = `Your Password reset token is${resetPassURL} .\n\nIf you have not requested this mail please ignore it.`;

  try {
    await SendMail({
      email: user.email,
      subject: "Video Streamer Password Recovery",
      message: EmailMsg,
      html: `
      <div style='
      width: 100%;
      display: column;
      justify-content: space-between;
      align-items: center;'>
      
      <p>Click on the button below to Reset Password</p>
      
      <a 
      href=${resetPassURL} 
      style='background-color: gold;
      color: black; 
      font-size: 1.2rem; 
      padding: 0.8rem 1.3rem;
      border-radius: 10px; 
      cursor: pointer;
      text-decoration: none;'>
        Reset Password
      </a>
      
      <p>If you have not requested this mail please ignore it.</p></div>`,
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "Email Sent Successfully !!" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: true });

    return next(
      new customAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

//-------User Reset Password-------
const resetPassword = async (req, res, next) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new customAPIError(
      "Invalid Password reset token or token is Expired !!",
      StatusCodes.BAD_REQUEST
    );
  }

  if (req.body.newPassword !== req.body.confirmNewPassword) {
    return next(
      new customAPIError("Passwords not Matched !!", StatusCodes.BAD_REQUEST)
    );
  }

  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  SendToken(res, user, StatusCodes.OK);
};

//-------User Password Update-------
const updateUserPass = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id).select("+password");
  const isMatch = await user.comparePasswords(req.body.oldPassword);

  if (!isMatch) {
    throw new customAPIError(
      "Old Password is incorrect !!",
      StatusCodes.UNAUTHORIZED
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new customAPIError("Passwords Does not Match", StatusCodes.BAD_REQUEST)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Password Updated successfully !!" });
};

//-------User Details Update-------
const updateUserDetails = async (req, res) => {
  const newDetails = {
    email: req.body.email,
    user_name: req.body.user_name,
  };

  const avatar = req.file;

  console.log(avatar);

  if (avatar.path) {
    const user = await User.findById(req.user.id);

    const imageID = user.avatar.public_id;

    // console.log({ imageID });

    await cloudinary.uploader
      .destroy(imageID)
      .then(() => console.log("old avatar Deleted"))
      .catch((err) => console.log(err));

    newDetails.avatar = {
      public_id: avatar.filename,
      url: avatar.path,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(StatusCodes.CREATED).json({ success: true, user });
};

//-------User Settings Update-------
const updateUserSettings = async (req, res) => {
  const newDetails = {
    subtitle_preset: req.body.subtitle_preset,
    autoPlay_videos: req.body.autoPlay_videos,
    autoPlay_trailers: req.body.autoPlay_trailers,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(StatusCodes.CREATED).json({ success: true, user });
};

//-------Admin Get All Users-------
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res
    .status(StatusCodes.OK)
    .json({ success: true, nbHIts: users.length, users });
};

//-------Admin Get Single User-------
const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new customAPIError(
      `User does not exist with this id ${req.params.id} !!`,
      StatusCodes.NOT_FOUND
    );
  }

  res.status(StatusCodes.OK).json({ success: true, user });
};

//-------Admin update Users Role-------
const updateUserRole = async (req, res) => {
  const { name, email, role } = req.body;

  let newUserDetails = {
    user_name: name,
    email,
    role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    throw new customAPIError(
      `User not found with id : ${(req, params.id)}`,
      StatusCodes.BAD_REQUEST
    );
  }

  res.status(StatusCodes.OK).json({ success: true });
};

//-------Admin Delete User-------
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) {
    throw new customAPIError(
      `User not found with id : ${(req, params.id)}`,
      StatusCodes.BAD_REQUEST
    );
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "User Deleted Successfully !!", user });
};

//-------Add to wishList-------
const addToWishlist = async (req, res) => {
  const { videoID } = req.body;

  const user = await User.findById(req.user.id);

  const isIncluded = user.wishList.includes(videoID);

  if (isIncluded) {
    console.log("isIncluded...");

    user.wishList = user.wishList.filter((item) => item != videoID);

    await user.save({ validateBeforeSave: true });

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Video Removed from Wishlist",
      isIncluded: !isIncluded,
      user,
    });
  } else {
    console.log("Adding to wishlist...");

    user.wishList = [...user.wishList, videoID];

    await user.save({ validateBeforeSave: true });

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Video Added to Wishlist",
      isIncluded: !isIncluded,
      user,
    });
  }
};

module.exports = {
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
  getSingleUser,
  updateUserRole,
  deleteUser,
  addToWishlist,
};
