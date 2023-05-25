import { configureStore } from "@reduxjs/toolkit";
import {
  ReviewReducer,
  UpdateDeleteVideosReducer,
  UpdateVideoViewReducer,
  getAllVideosReducer,
  getSingleVideoDetailsReducer,
  postVideoReducer,
} from "./Reducers/VideosReducers";

import {
  deleteUpdateUserReducer,
  forgotPasswordReducer,
  getAllUsersReducer,
  getMyDetailsReducer,
  getSingleUserDetailsReducer,
  updateProfileReducer,
  userReducer,
  wishlistReducer,
} from "./Reducers/UserReducer";

export const store = configureStore({
  reducer: {
    getAllVideos: getAllVideosReducer,
    postVideo: postVideoReducer,
    getSingleVideoDetails: getSingleVideoDetailsReducer,
    UpdateDeleteVideos: UpdateDeleteVideosReducer,
    review: ReviewReducer,
    VideoViews: UpdateVideoViewReducer,
    user: userReducer,
    getDetails: getMyDetailsReducer,
    getAllUsers: getAllUsersReducer,
    getSingleUserDetails: getSingleUserDetailsReducer,
    deleteUpdateUser: deleteUpdateUserReducer,
    forgotResetPassword: forgotPasswordReducer,
    updateProfile: updateProfileReducer,
    wishlist: wishlistReducer,
  },
});
