const { StatusCodes } = require("http-status-codes");
const User = require("../../../Models/UsersModel");

//-------Admin Get All Users-------
const GetAllUsers = async (req, res) => {
  const users = await User.find();

  res
    .status(StatusCodes.OK)
    .json({ success: true, nbHIts: users.length, users });
};

module.exports = GetAllUsers;
