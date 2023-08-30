const { StatusCodes } = require("http-status-codes");

//-------User LogOut-------
const LogOut = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .cookie("userToken", null, {
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    })
    .json({ success: true, msg: "Logged Out Successfully !!" });
};

module.exports = LogOut;
