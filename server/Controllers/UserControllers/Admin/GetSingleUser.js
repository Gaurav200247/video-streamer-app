const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../../../Errors/CustomAPIError");
const User = require("../../../Models/UsersModel");

//-------Admin Get Single User-------
const GetSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new customAPIError(
      `User does not exist with this id ${req.params.id} !!`,
      StatusCodes.NOT_FOUND
    );
  }

  res.status(StatusCodes.OK).json({ success: true, user });
};

module.exports = GetSingleUser;
