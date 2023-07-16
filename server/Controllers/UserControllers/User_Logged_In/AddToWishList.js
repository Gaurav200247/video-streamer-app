const { StatusCodes } = require("http-status-codes");
const User = require("../../../Models/UsersModel");
const Video = require("../../../Models/VideosModel");
const customAPIError = require("../../../Errors/CustomAPIError");

//-------Add to wishList-------
const AddToWishlist = async (req, res) => {
  const { videoID } = req.body;

  const user = await User.findById(req.user.id);

  const video = await Video.findById(videoID);

  if (!video) {
    throw new customAPIError("Video Does not exists");
  }

  const isIncluded = user.wishList.includes(videoID);

  if (isIncluded) {
    console.log("isIncluded...");

    user.wishList = user.wishList.filter((item) => item != videoID);

    await user.save({ validateBeforeSave: true });

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Video Removed from Wishlist",
      isIncluded: !isIncluded,
      user_wishList: user.wishList,
    });
  } else {
    console.log("Adding to wishlist...");

    user.wishList = [...user.wishList, videoID];

    await user.save({ validateBeforeSave: true });

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Video Added to Wishlist",
      isIncluded: !isIncluded,
      user_wishList: user.wishList,
    });
  }
};

module.exports = AddToWishlist;
