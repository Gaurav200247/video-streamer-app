const mongoose = require("mongoose");
const validator = require("validator");
const bcrytjs = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = mongoose.Schema(
  {
    user_name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: [3, "Please provide video title with more than 3 letters"],
    },

    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a Valide Email"],
    },

    password: {
      type: String,
      required: [true, "Please Enter Password"],
      minlength: [8, "Password Should be more than 8 Characters"],
      select: false,
    },

    avatar: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },

    subtitle_preset: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },

    watch_history: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "videos",
        required: true,
      },
    ],

    wishList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Videos",
        required: true,
      },
    ],

    autoPlay_videos: {
      type: Boolean,
      default: false,
    },

    autoPlay_trailers: {
      type: Boolean,
      default: false,
    },

    role: { type: String, default: "user", enum: ["admin", "user"] },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//----------------password hashing----------------
// we use pre "save method means before saving it to database run this function"
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // isModified tells that is the given attribute is modified or not
    next(); // if not modified go to next middleware
  }

  this.password = await bcrytjs.hash(this.password, 10); // password hashing and 10 is the salt in hash
});

//---------------Method to compare passwords---------------
// UserSchema.method("comparePasswords", async function (enteredPassword) {
//   const isMatch = await bcrytjs.compare(enteredPassword, this.password);
//   return isMatch;
// });
UserSchema.method("comparePasswords", async function (enteredPassword) {
  const isMatch = await bcrytjs.compare(enteredPassword, this.password);
  return isMatch;
});

//-----------method to return a jwt token when loging IN -----------
UserSchema.method("getJWTtoken", function () {
  return JWT.sign(
    { id: this._id, name: this.usr_name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
});

//-----------method to return a Reset Password token when loging IN -----------
UserSchema.method("getResetPasswordToken", function () {
  //creating some random bytes
  const resetToken = crypto.randomBytes(20).toString("hex");

  //   set resetPasswordToken to hashed token value
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // update resetPasswordExpire
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
});

module.exports = mongoose.model("Users", UserSchema);
