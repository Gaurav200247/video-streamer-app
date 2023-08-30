const { StatusCodes } = require("http-status-codes");

//-------User LogOut-------
const LogOut = async (req, res) => {
  res.cookie("userToken", null, {
    maxAge: 0,
    httpOnly: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Logged Out Successfully !!" });
};

module.exports = LogOut;
