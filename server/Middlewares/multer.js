const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const upload = multer({ dest: "public" }).array("videoFile", 3);
// const upload = multer({ dest: "public" }).fields([
//   { name: "thumbnail", maxCount: 1 },
//   { name: "cover_page", maxCount: 1 },
//   { name: "videoFile", maxCount: 1 },
// ]);

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `./public`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "videoFile") {
      const path = `./public/videos`;
      fs.mkdirSync(path, { recursive: true });

      const ext = file.mimetype.split("/")[1];
      cb(null, `videos/admin-${file.fieldname}-${Date.now()}.${ext}`);
    }
    if (file.fieldname === "thumbnail") {
      const path = `./public/thumbnail`;
      fs.mkdirSync(path, { recursive: true });

      const ext = file.mimetype.split("/")[1];
      cb(null, `thumbnail/admin-${file.fieldname}-${Date.now()}.${ext}`);
    }
    if (file.fieldname === "cover_page") {
      const path = `./public/cover_page`;
      fs.mkdirSync(path, { recursive: true });

      const ext = file.mimetype.split("/")[1];
      cb(null, `cover_page/admin-${file.fieldname}-${Date.now()}.${ext}`);
    }
  },
});

const upload = multer({
  storage: multerStorage,
}).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "cover_page", maxCount: 1 },
  { name: "videoFile", maxCount: 1 },
]);

// const storage = multer.memoryStorage;

// const upload = multer({
//   storage: storage.storage,
// }).fields([
//   { name: "thumbnail", maxCount: 1 },
//   { name: "cover_page", maxCount: 1 },
//   { name: "videoFile", maxCount: 1 },
// ]);

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Video Streamer Avatars",
  },
});

const avatarFilter = (req, file, cb) => {
  const ext = file.mimetype.split("/")[1];
  // console.log(ext);

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

// const avatarUpload = multer({ dest: "public/avatar" }).single("avatar");

module.exports = { upload, avatarUpload };
