const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../../Errors/CustomAPIError");
const Video = require("../../Models/VideosModel");

const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("../../Utils/firebase");
const { getStorage, ref, listAll, deleteObject } = require("firebase/storage");

const app = initializeApp(firebaseConfig);

//-------delete video-------
const deleteVideo = async (req, res) => {
  console.log("deleting video...");

  const video = await Video.findById(req.params.id);

  if (!video) {
    throw new customAPIError("Video not Found !!", StatusCodes.NOT_FOUND);
  }

  // *******************Deleting from firebase storage*******************
  const storage = getStorage(app);

  // --------------------deleting cover page--------------------
  const CoverlistRef = ref(storage, "cover_pages/");

  listAll(CoverlistRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // finding cover_page
        if (itemRef._location.path_ === video.cover_page.cover_path) {
          // deleting cover page
          deleteObject(itemRef)
            .then(() => {
              console.log("CoverPage deleted successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // --------------------deleting thumbnail--------------------
  const ThumbnaillistRef = ref(storage, "thumbnails/");

  listAll(ThumbnaillistRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // finding cover_page
        if (itemRef._location.path_ === video.thumbnail.thumbnail_path) {
          // deleting cover page
          deleteObject(itemRef)
            .then(() => {
              console.log("Thumbnail deleted successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // --------------------deleting thumbnail--------------------
  const VideolistRef = ref(storage, "videos/");

  listAll(VideolistRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // finding cover_page
        if (itemRef._location.path_ === video.video.video_path) {
          // deleting cover page
          deleteObject(itemRef)
            .then(() => {
              console.log("Video deleted successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // --------------------All Files Deleted--------------------

  console.log("All Files Deleted !!");

  // --------------------deleting video data from database--------------------
  console.log("deleting video data from database");

  const DeletedVideo = await Video.findOneAndRemove(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Video Deleted Successfully !!",
    DeletedVideo,
  });
};

module.exports = deleteVideo;
