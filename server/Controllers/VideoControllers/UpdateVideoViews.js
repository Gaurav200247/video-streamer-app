const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../../Errors/CustomAPIError");
const Video = require("../../Models/VideosModel");
const User = require("../../Models/UsersModel");

//-------Update video views-------
const updateVideoViews = async (req, res) => {
  const video = await Video.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!video) {
    throw new customAPIError("Video not Found !!", StatusCodes.NOT_FOUND);
  }

  if (user) {
    // if user exists then update user's watch_history and video's views
    let views = video.views + 1;
    let watch_history = [...user.watch_history, video._id];

    video.views = views;
    user.watch_history = watch_history;

    await video.save({ validateBeforeSave: true });
    await user.save({ validateBeforeSave: true });

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Views Increased !!",
      views: video.views,
    });
  } else {
    // if user don't exists keep the views unchanged.
    res.status(StatusCodes.OK).json({
      success: false,
      msg: "Views remained Same !!",
      views: video.views,
    });
  }
};

module.exports = updateVideoViews;
