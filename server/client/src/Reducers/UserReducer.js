import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {},
  {
    // -----------login user-----------
    LoginRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LoginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.user = null;
    },

    // -----------Register user-----------
    RegisterRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    RegisterSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    RegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },

    // -----------load user-----------
    LoadUserRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // -----------Log Out user-----------

    LogoutSuccess: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    LogoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // -----------Clear Errors-----------
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const forgotPasswordReducer = createReducer(
  {},
  {
    // -------Forgot password-------
    ForgotPasswordRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    ForgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    ForgotPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // -------Reset password-------
    ResetPasswordRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    ResetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    ResetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // -------Clear Errors-------
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const updateProfileReducer = createReducer(
  {},
  {
    // ------Update User Profile------
    updateProfileRequest: (state, action) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileReset: (state, action) => {
      state.isUpdated = false;
    },

    // ------Update User Pass------
    updatePasswordRequest: (state, action) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updatePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordReset: (state, action) => {
      state.isUpdated = false;
    },

    // ------Update User Profile Settings------
    updateProfileSettingsRequest: (state, action) => {
      state.loading = true;
    },
    updateProfileSettingsSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateProfileSettingsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileSettingsReset: (state, action) => {
      state.isUpdated = false;
    },
  }
);

export const getAllUsersReducer = createReducer(
  {},
  {
    // ------Update User Profile------
    GetAllUsersRequest: (state, action) => {
      state.loading = true;
    },
    GetAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    GetAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const deleteUpdateUserReducer = createReducer(
  {},
  {
    // ------delete User Admin------
    DeleteUserRequest: (state, action) => {
      state.loading = true;
    },
    DeleteUserSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DeleteUserFail: (state, action) => {
      state.loading = false;
      state.deleteError = action.payload;
    },
    DeleteUserReset: (state, action) => {
      state.isDeleted = false;
    },

    // ------update User Admin------
    UpdateUserRequest: (state, action) => {
      state.loading = true;
    },
    UpdateUserSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UpdateUserFail: (state, action) => {
      state.loading = false;
      state.updateError = action.payload;
    },
    UpdateUserReset: (state, action) => {
      state.isUpdated = false;
    },

    ClearErrors: (state, action) => {
      state.updateError = null;
      state.deleteError = null;
    },
  }
);

export const wishlistReducer = createReducer(
  {},
  {
    WishListRequest: (state, action) => {
      state.loading = true;
    },
    WishListSuccess: (state, action) => {
      state.loading = false;
      state.wishlistResponse = action.payload;
    },
    WishListFail: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    WishListReset: (state, action) => {
      state.loading = false;
      state.wishlistResponse = null;
    },
    ClearErrors: (state, action) => {
      state.errors = null;
    },
  }
);

export const getMyDetailsReducer = createReducer(
  {},
  {
    // -----------load user-----------
    GetMyDetailsRequest: (state, action) => {
      state.loading = true;
    },
    GetMyDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    GetMyDetailsFail: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
  }
);

// ------------------Admin------------------
export const getSingleUserDetailsReducer = createReducer(
  {},
  {
    GetSingleUserRequest: (state, action) => {
      state.loading = true;
      state.user = null;
    },
    GetSingleUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    GetSingleUserFail: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    ClearErrors: (state, action) => {
      state.errors = null;
    },
  }
);
