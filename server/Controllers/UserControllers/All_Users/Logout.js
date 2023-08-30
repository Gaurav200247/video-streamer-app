const { StatusCodes } = require("http-status-codes");

//-------User LogOut-------
const LogOut = async (req, res) => {
  res.cookie("userToken", null, {
    maxAge: new Date(Date.now() + 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Logged Out Successfully !!" });
};

module.exports = LogOut;
