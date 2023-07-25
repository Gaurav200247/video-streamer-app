const SendToken = async (req, res, user, statusCode) => {
  // get token
  const userToken = user.getJWTtoken();

  // create a cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_LIFETIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    withCredentials: true,
  };

  // res.set("Access-Control-Allow-Origin", req.headers.origin); //req.headers.origin
  // res.set("Access-Control-Allow-Credentials", "true");
  // // access-control-expose-headers allows JS in the browser to see headers other than the default 7
  // res.set(
  //   "Access-Control-Expose-Headers",
  //   "date, etag, access-control-allow-origin, access-control-allow-credentials"
  // );

  // save cookie
  res.status(statusCode).cookie("userToken", userToken, options).json({
    success: true,
    user,
    userToken,
  });
};

module.exports = SendToken;
