const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../Errors/CustomAPIError");
const Video = require("../Models/VideosModel");
const User = require("../Models/UsersModel");

const { google } = require("googleapis");
const fs = require("fs");

//intialize auth client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_CLIENT_ID,
  process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  process.env.GOOGLE_DRIVE_REDIRECT_URI
);

//adding credentials
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
});

//initialize google drive
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

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

//-------create a  video-------
const postVideo = async (req, res, next) => {
  const {
    title,
    tags,
    video_quality,
    censor_ratings,
    synopsis,
    audio_language,
    speciality_In,
    hours,
    minutes,
  } = req.body;

  console.log("posting video...");

  const videoFile = req.files.videoFile[0];
  const thumbnail = req.files.thumbnail[0];
  const cover_page = req.files.cover_page[0];

  if (!videoFile && !thumbnail && !cover_page) {
    throw new customAPIError("All File not Found !!", StatusCodes.NOT_FOUND);
  }

  console.log({ data: req.body });

  let tagsArr = tags.split(",");
  console.log({ tagsArr });

  let specialityArr = speciality_In.split(",");
  console.log({ specialityArr });

  // console.log({ hours: Number(hours) });

  const cover_page_path = cover_page.path;

  const CoverResponse = await drive.files.create({
    requestBody: {
      name: cover_page.originalname, //file name
      mimeType: cover_page.mimeType,
      role: "writer",
      type: "anyone",
    },
    media: {
      mimeType: cover_page.mimeType,
      body: fs.createReadStream(cover_page_path),
    },
  });

  const thumbnail_path = thumbnail.path;

  const ThumbnailResponse = await drive.files.create({
    requestBody: {
      name: thumbnail.originalname, //file name
      mimeType: thumbnail.mimeType,
      role: "writer",
      type: "anyone",
    },
    media: {
      mimeType: thumbnail.mimeType,
      body: fs.createReadStream(thumbnail_path),
    },
  });

  const video_path = videoFile.path;

  const VideoResponse = await drive.files.create({
    requestBody: {
      name: videoFile.originalname, //file name
      mimeType: videoFile.mimeType,
      role: "writer",
      type: "anyone",
    },
    media: {
      mimeType: videoFile.mimeType,
      body: fs.createReadStream(video_path),
    },
  });

  const videoPosted = await Video.create({
    title,
    tags: tagsArr,
    video_quality,
    censor_ratings,
    synopsis,
    audio_language,
    speciality_In: specialityArr,
    // video_length: {
    //   hours: Number(hours),
    //   minutes: Number(minutes),
    // },
    cover_page: {
      CoverID: CoverResponse.data.id,
    },
    thumbnail: {
      ThumbnailID: ThumbnailResponse.data.id,
    },
    video: {
      VideoID: VideoResponse.data.id,
    },
    // thumbnail: {
    //   path: thumbnail.path,
    //   size: thumbnail.size,
    // },
    // cover_page: {
    //   path: cover_page.path,
    //   size: cover_page.size,
    // },
    // video: {
    //   path: videoFile.path,
    //   size: videoFile.size,
    // },
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "Video Posted Successfully !!",
    videoPosted,
  });
};

//-------get single video-------
const getSingleVideoDetails = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    throw new customAPIError("Video not Found", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({ success: true, video });
};

//-------Stream Contents-------
const StreamContent = async (req, res) => {
  const { id } = req.params;
  const fileId = id;

  const response = await drive.files.get(
    {
      fileId,
      alt: "media",
    },
    { responseType: "stream" }
  );

  res.setHeader("Content-Type", response.headers["content-type"]);
  res.setHeader("Content-Length", response.headers["content-length"]);

  response.data
    .on("end", () => {
      console.log(`Content Streaming... with id : ${fileId}`);
    })
    .on("error", (err) => {
      console.error(`Content Stream failed !! with id : ${fileId}`, err);
    })
    .pipe(res);

  // console.log("streaming video...");

  // const path = video.video.path;
  // const fileSize = video.video.size;
  // const range = req.headers.range;

  // // When we start watching the video subsequent requests are made, this time with the range in the header so that we know the starting point of our next chunk.
  // if (range) {
  //   const parts = range.replace(/bytes=/, "").split("-");
  //   const start = parseInt(parts[0], 10);
  //   const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  //   const chunksize = end - start + 1;
  //   const file = fs.createReadStream(path, { start, end });
  //   const head = {
  //     "Content-Range": `bytes ${start}-${end}/${fileSize}`,
  //     "Accept-Ranges": "bytes",
  //     "Content-Length": chunksize,
  //     "Content-Type": "video/mp4",
  //   };
  //   res.writeHead(206, head);
  //   file.pipe(res);
  // } else {
  //   // executes first
  //   // When a request is made, we get the file size and send the first few chunks of the video
  //   const head = {
  //     "Content-Length": fileSize,
  //     "Content-Type": "video/mp4",
  //   };
  //   res.writeHead(200, head);
  //   fs.createReadStream(path).pipe(res);
  // }
};

//-------Update video-------
const updateVideo = async (req, res) => {
  const foundingVideo = await Video.findById(req.params.id);

  if (!foundingVideo) {
    throw new customAPIError("Video not Found !!", StatusCodes.NOT_FOUND);
  }

  // getting files
  const videoFile =
    (req.files && req.files.videoFile && req.files.videoFile[0]) || "";
  const thumbnail =
    (req.files && req.files.thumbnail && req.files.thumbnail[0]) || "";
  const cover_page =
    (req.files && req.files.cover_page && req.files.cover_page[0]) || "";

  let updateData = req.body;
  console.log("updating video...");

  // Deleting old files if exists
  if (
    videoFile &&
    videoFile.path &&
    foundingVideo &&
    foundingVideo.video &&
    foundingVideo.video.VideoID
  ) {
    const fileId = foundingVideo.video.VideoID;
    await drive.files.delete({
      fileId,
    });
    console.log("video file deleted...");
  }

  if (
    cover_page &&
    cover_page.path &&
    foundingVideo &&
    foundingVideo.cover_page &&
    foundingVideo.cover_page.CoverID
  ) {
    const fileId = foundingVideo.cover_page.CoverID;
    await drive.files.delete({
      fileId,
    });
    console.log("Cover file deleted...");
  }

  if (
    thumbnail &&
    thumbnail.path &&
    foundingVideo &&
    foundingVideo.thumbnail &&
    foundingVideo.thumbnail.ThumbnailID
  ) {
    const fileId = foundingVideo.thumbnail.ThumbnailID;
    await drive.files.delete({
      fileId,
    });
    console.log("thumbnail file deleted...");
  }

  // loading new files
  if (videoFile && videoFile.path && fs.existsSync(videoFile.path)) {
    const video_path = videoFile.path;

    const VideoResponse = await drive.files.create({
      requestBody: {
        name: videoFile.originalname, //file name
        mimeType: videoFile.mimeType,
        role: "writer",
        type: "anyone",
      },
      media: {
        mimeType: videoFile.mimeType,
        body: fs.createReadStream(video_path),
      },
    });
    updateData.video = { VideoID: VideoResponse.data.id };
    console.log("VideoID Changed");
  }

  if (cover_page && cover_page.path && fs.existsSync(cover_page.path)) {
    const cover_page_path = cover_page.path;

    const CoverResponse = await drive.files.create({
      requestBody: {
        name: cover_page.originalname, //file name
        mimeType: cover_page.mimeType,
        role: "writer",
        type: "anyone",
      },
      media: {
        mimeType: cover_page.mimeType,
        body: fs.createReadStream(cover_page_path),
      },
    });
    updateData.cover_page = { CoverID: CoverResponse.data.id };
    console.log("CoverID Changed");
  }

  if (thumbnail && thumbnail.path && fs.existsSync(thumbnail.path)) {
    const thumbnail_path = thumbnail.path;

    const ThumbnailResponse = await drive.files.create({
      requestBody: {
        name: thumbnail.originalname, //file name
        mimeType: thumbnail.mimeType,
        role: "writer",
        type: "anyone",
      },
      media: {
        mimeType: thumbnail.mimeType,
        body: fs.createReadStream(thumbnail_path),
      },
    });
    updateData.thumbnail = { ThumbnailID: ThumbnailResponse.data.id };
    console.log("ThumbnailID Changed");
  }

  // updating other attributes
  if (updateData.speciality_In) {
    let new_speciality = updateData.speciality_In.split(",");
    // console.log(new_speciality);
    updateData.speciality_In = new_speciality;
  }

  if (updateData.tags) {
    let new_tags = updateData.tags.split(",");
    // console.log(new_tags);
    updateData.tags = new_tags;
  }

  if (updateData.hours && updateData.minutes) {
    updateData.video_length = {
      hours: Number(updateData.hours),
      minutes: Number(updateData.minutes),
    };
  }

  console.log({ updateData });

  const updatedVideo = await Video.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Video Updated Successfully !!",
    video: updatedVideo,
  });
};

//-------Update video views-------
const updateVideoViews = async (req, res) => {
  const video = await Video.findById(req.params.id);
  const user = await User.findById(req.user.id);
  // console.log(req.user);

  if (!video) {
    throw new customAPIError("Video not Found !!", StatusCodes.NOT_FOUND);
  }

  if (user) {
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
    res.status(StatusCodes.OK).json({
      success: false,
      msg: "Views remained Same !!",
      views: video.views,
    });
  }
};

//-------delete video-------
const deleteVideo = async (req, res) => {
  const video = await Video.findByIdAndRemove(req.params.id);

  if (!video) {
    throw new customAPIError("Video not Found !!", StatusCodes.NOT_FOUND);
  }

  console.log("video deleted...");

  if (video.video.VideoID) {
    const fileId = video.video.VideoID;
    await drive.files.delete({
      fileId,
    });
    console.log("video file deleted...");
  }

  if (video.thumbnail.ThumbnailID) {
    const fileId = video.thumbnail.ThumbnailID;
    await drive.files.delete({
      fileId,
    });
    console.log("thumbnail file deleted...");
  }

  if (video.cover_page.CoverID) {
    const fileId = video.cover_page.CoverID;
    await drive.files.delete({
      fileId,
    });
    console.log("Cover file deleted...");
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Video Deleted Successfully !!", video });
};

module.exports = {
  getAllVideos,
  postVideo,
  getSingleVideoDetails,
  StreamContent,
  updateVideo,
  deleteVideo,
  updateVideoViews,
};
