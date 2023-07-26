const { StatusCodes } = require("http-status-codes");

//-------User LogOut-------
const LogOut = async (req, res) => {
  res.cookie("userToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Logged Out Successfully !!" });
};

module.exports = LogOut;
