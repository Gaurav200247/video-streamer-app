import { createReducer } from "@reduxjs/toolkit";

export const getAllVideosReducer = createReducer(
  {},
  {
    GetAllVideosRequest: (state, action) => {
      state.loading = true;
    },
    GetAllVideosSuccess: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    GetAllVideosFail: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    ClearErrors: (state, action) => {
      state.errors = null;
    },
  }
);

export const getSingleVideoDetailsReducer = createReducer(
  {},
  {
    GetSingleVideoDetailsRequest: (state, action) => {
      state.loading = true;
      state.video = null;
    },
    GetSingleVideoDetailsSuccess: (state, action) => {
      state.loading = false;
      state.video = action.payload;
    },
    GetSingleVideoDetailsFail: (state, action) => {
      state.loading = false;
      state.video = null;

      state.errors = action.payload;
    },
    GetSingleVideoContentRequest: (state, action) => {
      state.loading = true;
    },
    GetSingleVideoContentSuccess: (state, action) => {
      state.loading = false;
      state.videoContent = action.payload;
    },
    GetSingleVideoContentFail: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    ClearErrors: (state, action) => {
      state.errors = null;
    },
  }
);

export const ReviewReducer = createReducer(
  {},
  {
    //---------------------- update Video----------------------
    CreateUpdateReviewRequest: (state) => {
      state.loading = true;
    },
    CreateUpdateReviewSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    CreateUpdateReviewFail: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.updateError = action.payload;
    },
    CreateUpdateReviewReset: (state, action) => {
      state.isUpdated = false;
    },
    // ---------------------- delete Video----------------------
    DeleteReviewRequest: (state) => {
      state.loading = true;
    },
    DeleteReviewSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DeleteReviewFail: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.deleteError = action.payload;
    },
    DeleteReviewReset: (state, action) => {
      state.isDeleted = false;
    },

    // ---------------------- clear Errors ----------------------
    ClearErrors: (state) => {
      state.deleteError = null;
      state.updateError = null;
    },
  }
);

export const UpdateVideoViewReducer = createReducer(
  {},
  {
    //---------------------- Update Video Views----------------------
    UpdateVideoViewRequest: (state) => {
      state.loading = true;
    },
    UpdateVideoViewSuccess: (state, action) => {
      state.loading = false;
      state.viewData = action.payload;
    },
    UpdateVideoViewFail: (state, action) => {
      state.loading = false;
      state.viewData = false;
      state.viewError = action.payload;
    },
    UpdateVideoViewReset: (state, action) => {
      state.viewData = false;
    },
  }
);

// ------------------Admin------------------
export const postVideoReducer = createReducer(
  {},
  {
    PostVideoRequest: (state, action) => {
      state.loading = true;
    },
    PostVideoSuccess: (state, action) => {
      state.loading = false;
      state.isPosted = action.payload;
    },
    PostVideoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    PostVideoReset: (state, action) => {
      state.isPosted = null;
    },
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const UpdateDeleteVideosReducer = createReducer(
  {},
  {
    //---------------------- update Video----------------------
    UpdateVideoRequest: (state) => {
      state.loading = true;
    },
    UpdateVideoSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UpdateVideoFail: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.updateError = action.payload;
    },
    UpdateVideoReset: (state, action) => {
      state.isUpdated = false;
    },
    // ---------------------- delete Video----------------------
    DeleteVideoRequest: (state) => {
      state.loading = true;
    },
    DeleteVideoSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DeleteVideoFail: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.deleteError = action.payload;
    },
    DeleteVideoReset: (state, action) => {
      state.isDeleted = false;
    },

    // ---------------------- clear Errors ----------------------
    ClearErrors: (state) => {
      state.deleteError = null;
      state.updateError = null;
    },
  }
);
