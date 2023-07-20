const { StatusCodes } = require("http-status-codes");

//-------User LogOut-------
const LogOut = async (req, res) => {
  res.cookie("userToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "strict",
    signed: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Logged Out Successfully !!" });
};

module.exports = LogOut;
