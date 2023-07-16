const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");

const customAPIError = require("../../../Errors/CustomAPIError");
const User = require("../../../Models/UsersModel");
const SendToken = require("../../../Utils/SendToken");

//-------User Reset Password-------
const ResetPassword = async (req, res, next) => {
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

module.exports = ResetPassword;
