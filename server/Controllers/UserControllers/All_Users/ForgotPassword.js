const { StatusCodes } = require("http-status-codes");

const customAPIError = require("../../../Errors/CustomAPIError");
const User = require("../../../Models/UsersModel");
const SendMail = require("../../../Utils/SendMail");

//-------User Forgot Password-------
const ForgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new customAPIError("User not Found !!", StatusCodes.NOT_FOUND);
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: true });

  const resetPassURL = `http://localhost:3000/password/reset/${resetToken}`;

  const EmailMsg = `Your Password reset token is${resetPassURL} .\n\nIf you have not requested this mail please ignore it.`;

  try {
    await SendMail({
      email: user.email,
      subject: "Video Streamer Password Recovery",
      message: EmailMsg,
      html: `
        <div style='
        width: 100%;
        display: column;
        justify-content: space-between;
        align-items: center;'>
        
        <p>Click on the button below to Reset Password</p>
        
        <a 
        href=${resetPassURL} 
        style='background-color: gold;
        color: black; 
        font-size: 1.2rem; 
        padding: 0.8rem 1.3rem;
        border-radius: 10px; 
        cursor: pointer;
        text-decoration: none;'>
          Reset Password
        </a>
        
        <p>If you have not requested this mail please ignore it.</p></div>`,
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "Email Sent Successfully !!" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: true });

    return next(
      new customAPIError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

module.exports = ForgotPassword;
