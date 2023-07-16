const mongoose = require("mongoose");

const VideoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide video title"],
      minlength: [3, "Please provide video title with more than 3 letters"],
    },

    cover_page: {
      CoverPageURL: {
        type: String,
        required: [true, "Please provide thumbnail URL"],
      },
      cover_path: {
        type: String,
        required: [true, "Please provide thumbnail path"],
      },
    },

    thumbnail: {
      ThumbnailURL: {
        type: String,
        required: [true, "Please provide thumbnail URL"],
      },
      thumbnail_path: {
        type: String,
        required: [true, "Please provide thumbnail path"],
      },
    },

    video: {
      videoURL: {
        type: String,
        required: [true, "Please provide thumbnail URL"],
      },
      video_path: {
        type: String,
        required: [true, "Please provide thumbnail path"],
      },
    },

    video_length: {
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
    },

    video_quality: {
      type: String,
      enum: ["SD", "HD", "4k"],
      required: [true, "Please Add Video Quality"],
    },

    censor_ratings: {
      type: String,
      enum: ["U/A 13+", "U/A 16+", "18+", "A"],
      required: [true, "Please Add Censor Ratings"],
    },

    synopsis: {
      type: String,
      required: [true, "Please Enter Video Synopsis"],
    },

    tags: [
      {
        type: String,
      },
    ],

    audio_language: { type: String },

    views: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        like: {
          type: Boolean,
          default: false,
        },
      },
    ],

    numOfReviews: {
      type: Number,
      default: 0,
    },

    speciality_In: [{ type: String }],

    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Videos", VideoSchema);
