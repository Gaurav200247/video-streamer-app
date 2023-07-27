const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;

const User = require("../../../Models/UsersModel");

//-------User Details Update-------
const UpdateUserDetails = async (req, res) => {
  const newDetails = {
    email: req.body.email,
    user_name: req.body.user_name,
  };

  const avatar = req.file;

  if (avatar?.path) {
    const user = await User.findById(req.user.id);

    // old avatar id
    const imageID = user.avatar.public_id;

    // deleting old avatar
    await cloudinary.uploader
      .destroy(imageID)
      .then(() => console.log("old avatar Deleted"))
      .catch((err) => console.log(err));

    // adding new avatar data to newDetails object
    newDetails.avatar = {
      public_id: avatar.filename,
      url: avatar.path,
    };
  }

  console.log({ newDetails });

  const user = await User.findByIdAndUpdate(req.user.id, newDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    user,
  });
};

module.exports = UpdateUserDetails;
