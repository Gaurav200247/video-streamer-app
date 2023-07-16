const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../../../Errors/CustomAPIError");
const User = require("../../../Models/UsersModel");

//-------Admin Delete User-------
const DeleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) {
    throw new customAPIError(
      `User not found with id : ${req.params.id}`,
      StatusCodes.BAD_REQUEST
    );
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "User Deleted Successfully !!", user });
};

module.exports = DeleteUser;
