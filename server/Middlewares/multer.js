const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// ------------------files upload multer config------------------

const storage = multer.memoryStorage;

const upload = multer({
  storage: storage.storage,
}).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "cover_page", maxCount: 1 },
  { name: "videoFile", maxCount: 1 },
]);

// ------------------user avatar upload multer config------------------

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Video Streamer Avatars",
  },
});

const avatarFilter = (req, file, cb) => {
  const ext = file.mimetype.split("/")[1];

  if (ext === "png" || ext === "jpg" || ext === "gif" || ext === "jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Not a Image File!!"), false);
  }
};

const avatarUpload = multer({
  storage: avatarStorage,
  fileFilter: avatarFilter,
}).single("avatar");

module.exports = { upload, avatarUpload };
