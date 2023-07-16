const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../../../Errors/CustomAPIError");
const User = require("../../../Models/UsersModel");

//-------Admin update Users Role-------
const UpdateUserRole = async (req, res) => {
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
      `User not found with id : ${req.params.id}`,
      StatusCodes.BAD_REQUEST
    );
  }

  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = UpdateUserRole;
