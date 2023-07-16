const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../../../Errors/CustomAPIError");
const User = require("../../../Models/UsersModel");

//-------User Password Update-------
const UpdateUserPass = async (req, res, next) => {
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

module.exports = UpdateUserPass;
