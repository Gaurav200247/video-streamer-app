const { StatusCodes } = require("http-status-codes");
const Video = require("../../Models/VideosModel");

//-------get single video-------
const getSingleVideoDetails = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    throw new customAPIError("Video not Found", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({ success: true, video });
};

module.exports = getSingleVideoDetails;
