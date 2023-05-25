const DataUriParser = require("datauri/parser");
const path = require("path");

const getDataUri = (video) => {
  const parser = new DataUriParser();
  const extName = path.extname(video.originalname).toString();
  // console.log(extName);
  return parser.format(extName, video.buffer);
};

module.exports = getDataUri;
