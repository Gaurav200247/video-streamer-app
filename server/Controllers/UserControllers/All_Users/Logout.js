const { StatusCodes } = require("http-status-codes");

//-------User LogOut-------
const LogOut = async (req, res) => {
  res.cookie("userToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.set("Access-Control-Allow-Origin", req.headers.origin);
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Expose-Headers", "date, etag");

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Logged Out Successfully !!" });
};

module.exports = LogOut;
