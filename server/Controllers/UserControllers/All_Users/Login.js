const { StatusCodes } = require("http-status-codes");

const customAPIError = require("../../../Errors/CustomAPIError");
const User = require("../../../Models/UsersModel");
const SendToken = require("../../../Utils/SendToken");

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

  SendToken(req, res, user, StatusCodes.OK);
};

module.exports = LogIn;
