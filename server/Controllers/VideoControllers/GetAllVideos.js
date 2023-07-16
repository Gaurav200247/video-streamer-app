const { StatusCodes } = require("http-status-codes");
const Video = require("../../Models/VideosModel");

//-------get all videos-------
const getAllVideos = async (req, res) => {
  const { title, tags, featured, mostViewed } = req.query;

  let queryObj = {};

  if (title) {
    queryObj.title = { $regex: title, $options: "i" }; // (i = case insensitive) & (regex = what pattern to find)
  }

  if (featured) {
    queryObj.featured = featured;
  }

  if (tags && tags.length > 0) {
    let tagsArray = tags.split(",");
    queryObj.tags = { $all: tagsArray };
  }

  // console.log(queryObj);

  let result = Video.find(queryObj);
  let FullResult = Video.find({});

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 16;
  const skip = (page - 1) * limit;

  // if (ratings > 0 && ratings < 5) {
  //   result = result.skip(skip).limit(limit).sort("-user_ratings");
  // } else if (ratings > 5) {
  //   result = result.skip(skip).limit(limit).sort("-createdAt");
  // }

  if (mostViewed === "true") {
    result = result.skip(skip).limit(limit).sort("-views");
  } else {
    result = result.skip(skip).limit(limit).sort("-createdAt");
  }

  const videos = await result;
  const Allvideos = await FullResult;

  res.status(StatusCodes.OK).json({
    success: true,
    TotalnbHits: Allvideos.length,
    nbHits: videos.length,
    videos,
  });
};

module.exports = getAllVideos;
