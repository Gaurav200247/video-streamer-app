const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../Errors/CustomAPIError");
const { google } = require("googleapis");
const Video = require("../Models/VideosModel");
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

const TestpostVideo = async (req, res, next) => {
  console.log("Test Post video...");

  const videoFile = req.files.videoFile[0];
  const thumbnail = req.files.thumbnail[0];
  const cover_page = req.files.cover_page[0];

  if (!videoFile && !thumbnail && !cover_page) {
    throw new customAPIError("All File not Found !!", StatusCodes.NOT_FOUND);
  }

  // console.log({ thumbnail, videoFile });

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

  const data = {
    CoverID: CoverResponse.data.id,
    ThumbnailID: ThumbnailResponse.data.id,
    videoID: VideoResponse.data.id,
  };

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "Test Video Posted Successfully !!",
    data,
  });
};

const TestStreamVideo = async (req, res, next) => {
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
      console.log("Video streaming...");
    })
    .on("error", (err) => {
      console.error("Video stream failed !!", err);
    })
    .pipe(res);

  // res.status(StatusCodes.OK).json({
  //   success: true,
  //   msg: "Streaming Video...",
  // });
};

const TestDeleteVideo = async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findByIdAndRemove(videoId);

  if (!video) {
    throw new customAPIError("Video not Found !!", StatusCodes.NOT_FOUND);
  }

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
    console.log("video file deleted...");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Test Video Deleted...",
  });
};

const TestUpdateVideo = async (req, res) => {
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
    msg: "Test Video updated...",
    updatedVideo,
  });
};

module.exports = {
  TestpostVideo,
  TestStreamVideo,
  TestDeleteVideo,
  TestUpdateVideo,
};
