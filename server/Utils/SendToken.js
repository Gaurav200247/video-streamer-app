const SendToken = async (req, res, user, statusCode) => {
  // get token
  const userToken = user.getJWTtoken();

  // create a cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_LIFETIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: none,
    secure: true,
    // secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    // sameSite: "strict", // Prevent CSRF attacks
  };

  res.setHeader("Access-Control-Allow-Origin", "*");

  // save cookie
  res.status(statusCode).cookie("userToken", userToken, options).json({
    success: true,
    user,
    userToken,
  });

  // res.status(statusCode).json({
  //   success: true,
  //   user,
  //   userToken,
  // });
};

module.exports = SendToken;
