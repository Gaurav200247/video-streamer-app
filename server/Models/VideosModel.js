const mongoose = require("mongoose");

const VideoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide video title"],
      minlength: [3, "Please provide video title with more than 3 letters"],
    },

    cover_page: {
      CoverID: {
        type: String,
        required: [true, "Please provide CoverID"],
      },
    },

    thumbnail: {
      ThumbnailID: {
        type: String,
        required: [true, "Please provide thumbnailID"],
      },
    },

    video: {
      VideoID: {
        type: String,
        required: [true, "Please provide videoID"],
      },
    },

    // thumbnail: {
    //   path: {
    //     type: String,
    //     required: [true, "Please provide thumbnail path"],
    //   },
    //   size: {
    //     type: Number,
    //     required: [true, "Please provide thumbnail size"],
    //   },
    // },

    // cover_page: {
    //   path: {
    //     type: String,
    //     required: [true, "Please provide cover_page path"],
    //   },
    //   size: {
    //     type: Number,
    //     required: [true, "Please provide cover_page size"],
    //   },
    // },

    // video: {
    //   path: {
    //     type: String,
    //     required: [true, "Please provide video path"],
    //   },
    //   size: {
    //     type: Number,
    //     required: [true, "Please provide video size"],
    //   },
    // },

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
