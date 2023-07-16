const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../../Errors/CustomAPIError");
const Video = require("../../Models/VideosModel");

const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("../../Utils/firebase");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

// initiallizing App
const app = initializeApp(firebaseConfig);

//-------create a  video-------
const postVideo = async (req, res) => {
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

  console.log({ videoFile, thumbnail, cover_page });

  if (!videoFile && !thumbnail && !cover_page) {
    throw new customAPIError("All File not Found !!", StatusCodes.NOT_FOUND);
  }

  let tagsArr = tags.split(",");
  console.log({ tagsArr });

  let specialityArr = speciality_In.split(",");
  console.log({ specialityArr });

  // *************************************************uploading Starts*************************************************

  // Initialize firebase Storage
  const storage = getStorage(app);

  const dateTime = new Date();

  // -----------------Uploading Cover Page-----------------
  console.log("uploading Cover_page...");

  const coverPageRef = ref(
    storage,
    `cover_pages/${dateTime.getTime() + cover_page.originalname}`
  );
  // setting metaData
  const CoverPage_metadata = {
    contentType: cover_page.mimetype,
  };
  // uploading files
  const CoverPageSnapShot = await uploadBytesResumable(
    coverPageRef,
    cover_page.buffer,
    CoverPage_metadata
  );

  // -----------------Uploading thumbnail-----------------
  console.log("uploading thumbnail...");

  const ThumbnailRef = ref(
    storage,
    `thumbnails/${dateTime.getTime() + thumbnail.originalname}`
  );
  // setting metaData
  const Thumbnail_metadata = {
    contentType: thumbnail.mimetype,
  };
  // uploading files
  const ThumbnailSnapShot = await uploadBytesResumable(
    ThumbnailRef,
    thumbnail.buffer,
    Thumbnail_metadata
  );

  // -----------------Uploading Video-----------------
  console.log("uploading video...");

  const VideoFileRef = ref(
    storage,
    `videos/${dateTime.getTime() + videoFile.originalname}`
  );
  // setting metaData
  const VideoFile_metadata = {
    contentType: videoFile.mimetype,
  };
  // uploading files
  const VideoFileSnapShot = await uploadBytesResumable(
    VideoFileRef,
    videoFile.buffer,
    VideoFile_metadata
  );

  // *************************************************uploading Ends*************************************************
  console.log("all uploads completed.");

  // ----------------------------Grab the public url----------------------------

  const CoverPageURL = await getDownloadURL(CoverPageSnapShot.ref);
  const ThumbnailURL = await getDownloadURL(ThumbnailSnapShot.ref);
  const videoURL = await getDownloadURL(VideoFileSnapShot.ref);

  // get path from this
  const cover_path = CoverPageSnapShot.metadata.fullPath;
  const thumbnail_path = ThumbnailSnapShot.metadata.fullPath;
  const video_path = VideoFileSnapShot.metadata.fullPath;

  console.log({
    CoverPageURL,
    ThumbnailURL,
    videoURL,
  });

  const videoPosted = await Video.create({
    title,
    tags: tagsArr,
    video_quality,
    censor_ratings,
    synopsis,
    audio_language,
    speciality_In: specialityArr,
    video_length: {
      hours: Number(hours),
      minutes: Number(minutes),
    },
    cover_page: {
      CoverPageURL,
      cover_path,
    },
    thumbnail: {
      ThumbnailURL,
      thumbnail_path,
    },
    video: {
      videoURL,
      video_path,
    },
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "Video Posted Successfully !!",
    videoPosted,
  });
};

module.exports = postVideo;
