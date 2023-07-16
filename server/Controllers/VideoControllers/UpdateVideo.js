const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../../Errors/CustomAPIError");
const Video = require("../../Models/VideosModel");

const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("../../Utils/firebase");
const {
  getStorage,
  ref,
  listAll,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

const app = initializeApp(firebaseConfig);

//-------Update video-------
const updateVideo = async (req, res) => {
  console.log("updating video...");

  const givenVideo = await Video.findById(req.params.id);

  if (!givenVideo) {
    throw new customAPIError("Video not Found !!", StatusCodes.NOT_FOUND);
  }

  // **********************************Updating  Attributes**********************************
  let updateData = req.body;

  if (updateData.speciality_In) {
    let new_speciality = updateData.speciality_In.split(",");
    updateData.speciality_In = new_speciality;
  }

  if (updateData.tags) {
    let new_tags = updateData.tags.split(",");
    updateData.tags = new_tags;
  }

  if (updateData.hours && updateData.minutes) {
    updateData.video_length = {
      hours: Number(updateData.hours),
      minutes: Number(updateData.minutes),
    };
  }

  if (updateData.featured) {
    updateData.featured = Boolean(updateData.featured);
  }

  // ********************************** Getting files which we want to update**********************************
  const thumbnail =
    (req.files && req.files.thumbnail && req.files.thumbnail[0]) || "";
  const cover_page =
    (req.files && req.files.cover_page && req.files.cover_page[0]) || "";

  // ********************************** Deleting old files from firebase storage **********************************

  const storage = getStorage(app);

  // --------------------deleting cover page--------------------
  const CoverlistRef = ref(storage, "cover_pages/");

  listAll(CoverlistRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // finding cover_page
        if (itemRef._location.path_ === givenVideo.cover_page.cover_path) {
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
        if (itemRef._location.path_ === givenVideo.thumbnail.thumbnail_path) {
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

  // --------------------All files deleted successfully--------------------

  console.log("All files deleted successfully !!");

  // ********************************** Adding new files to firebase storage **********************************

  // Initialize firebase Storage
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

  //-----------------All files uploaded-----------------
  console.log("All files uploaded successfully !!");

  // get URLs from this
  const CoverPageURL = await getDownloadURL(CoverPageSnapShot.ref);
  const ThumbnailURL = await getDownloadURL(ThumbnailSnapShot.ref);

  // get path from this
  const cover_path = CoverPageSnapShot.metadata.fullPath;
  const thumbnail_path = ThumbnailSnapShot.metadata.fullPath;

  // ************************************updating data with updated files************************************
  updateData.thumbnail = {
    ThumbnailURL,
    thumbnail_path,
  };

  updateData.cover_page = {
    CoverPageURL,
    cover_path,
  };

  console.log({ updateData });

  // ------------------updating Database------------------

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

module.exports = updateVideo;
