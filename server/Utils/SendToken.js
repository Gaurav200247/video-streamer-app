const SendToken = async (res, user, statusCode) => {
  // get token
  const userToken = user.getJWTtoken();

  // create a cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_LIFETIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // save cookie
  res.status(statusCode).cookie("userToken", userToken, options).json({
    success: true,
    user,
    userToken,
  });
};

module.exports = SendToken;
