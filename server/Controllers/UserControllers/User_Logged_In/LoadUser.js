const { StatusCodes } = require("http-status-codes");
const User = require("../../../Models/UsersModel");

const LoadUser = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new customAPIError("User not Found", StatusCodes.BAD_REQUEST);
  }

  res.status(StatusCodes.OK).json({ success: true, user });
};

module.exports = LoadUser;
