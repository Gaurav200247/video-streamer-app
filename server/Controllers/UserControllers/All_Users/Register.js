const { StatusCodes } = require("http-status-codes");

const customAPIError = require("../../../Errors/CustomAPIError");
const User = require("../../../Models/UsersModel");
const SendToken = require("../../../Utils/SendToken");

//-------User Register-------
const Register = async (req, res) => {
  const { name, email, password } = req.body;
  const avatar = req.file;

  // console.log(req.body);
  // console.log(avatar);

  // checking for username is unique or taken already
  const user = await User.findOne({ user_name: name });

  if (user) {
    throw new customAPIError(
      "This username is already taken !",
      StatusCodes.BAD_REQUEST
    );
  }

  // checking for avatar field
  if (!req.file) {
    throw new customAPIError(
      "Please choose an Avatar",
      StatusCodes.BAD_REQUEST
    );
  }

  //   ----------------creating user---------------------
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

module.exports = Register;
