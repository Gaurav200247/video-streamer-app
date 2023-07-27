const { StatusCodes } = require("http-status-codes");
const customAPIError = require("../Errors/CustomAPIError");
const JWT = require("jsonwebtoken");
const User = require("../Models/UsersModel");

const authMiddleware = async (req, res, next) => {
  const { userToken } = req.cookies;

  if (!userToken) {
    throw new customAPIError(
      "Please login to access this Route...",
      StatusCodes.UNAUTHORIZED
    );
  }

  const decoded = JWT.verify(userToken, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
};

const authRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new customAPIError(
          "This User is Not Allowed to Access this Route",
          StatusCodes.UNAUTHORIZED
        )
      );
    }
    next();
  };
};

module.exports = { authMiddleware, authRoles };
