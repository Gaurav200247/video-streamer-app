import axios from "axios";
import { BASE_URL } from "./BASE_URL";
const config = {
  headers: { "Content-Type": "application/json" },
};

// The cookie gets send automatically by the browser in every subsequent request.
axios.defaults.withCredentials = true;

export const RegisterUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "RegisterRequest" });

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/register`,
      userData,
      config
    );

    console.log({ RegisterUserData: data });

    // if (data?.success && data?.userToken) {
    //   cookies.set("userToken", data?.userToken, { path: "/" });
    // }

    dispatch({ type: "RegisterSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "RegisterFail", payload: error.response.data.msg });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });

    const response = await axios.post(
      `${BASE_URL}/api/v1/login`,
      { email, password },
      config
    );

    // Handle the response data
    const data = response.data;
    console.log("Response Data:", data);

    // Access the response headers
    const headers = response.headers;
    console.log("Response Headers:", headers);

    dispatch({ type: "LoginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "LoginFail", payload: error.response.data.msg });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(`${BASE_URL}/api/v1/me`);

    console.log({ LoadUserData: data });

    // if (data?.success && data?.userToken) {
    //   cookies.set("userToken", data?.userToken, { path: "/" });
    // }

    dispatch({ type: "LoadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "LoadUserFail", payload: error.response.data.msg });
  }
};

export const getMyDetails = () => async (dispatch) => {
  try {
    dispatch({ type: "GetMyDetailsRequest" });

    const { data } = await axios.get(`${BASE_URL}/api/v1/me`);

    console.log({ data });

    dispatch({ type: "GetMyDetailsSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "GetMyDetailsFail", payload: error.response.data.msg });
  }
};

export const logOutUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/logout`);

    console.log({ data });

    // if (data?.success) {
    //   cookies.set("userToken", "", { path: "/" });
    // }

    dispatch({ type: "LogoutSuccess" });
  } catch (error) {
    dispatch({ type: "LogoutFail", payload: error.response.data.msg });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "ForgotPasswordRequest" });

    let link = `${BASE_URL}/api/v1/password/forgot`;

    const data = await axios.post(link, { email }, config);

    console.log({ data });

    dispatch({
      type: "ForgotPasswordSuccess",
      payload: data.data.msg,
    });
  } catch (error) {
    dispatch({
      type: "ForgotPasswordFail",
      payload: error.response.data.msg,
    });
  }
};

export const resetPassword =
  (resetToken, newPassword, confirmNewPassword) => async (dispatch) => {
    console.log({ newPassword, confirmNewPassword });
    try {
      dispatch({ type: "ResetPasswordRequest" });

      let link = `${BASE_URL}/api/v1/password/reset/${resetToken}`;

      const data = await axios.patch(
        link,
        { newPassword, confirmNewPassword },
        config
      );

      console.log({ data });

      dispatch({
        type: "ResetPasswordSuccess",
        payload: data.data.success,
      });
    } catch (error) {
      dispatch({
        type: "ResetPasswordFail",
        payload: error.response.data.msg,
      });
    }
  };

export const updateProfilePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });

      let link = `${BASE_URL}/api/v1/me/update/password`;

      const data = await axios.put(
        link,
        { oldPassword, newPassword, confirmPassword },
        config
      );

      console.log({ data });

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.data.success,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFail",
        payload: error.response.data.msg,
      });
    }
  };

export const updateProfileDetails = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });

    let link = `${BASE_URL}/api/v1/me/update`;

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const data = await axios.put(link, userData, config);

    console.log({ data });

    dispatch({
      type: "updateProfileSuccess",
      payload: data.data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.msg,
    });
  }
};

export const updateProfileSettings = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileSettingsRequest" });

    let link = `${BASE_URL}/api/v1/me/update/settings`;

    const data = await axios.put(link, userData, config);

    console.log({ data });

    dispatch({
      type: "updateProfileSettingsSuccess",
      payload: data.data.success,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileSettingsFail",
      payload: error.response.data.msg,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "GetAllUsersRequest" });

    let link = `${BASE_URL}/api/v1/admin/users`;

    const data = await axios.get(link);

    console.log({ data });

    dispatch({
      type: "GetAllUsersSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "GetAllUsersFail",
      payload: error.response.data.msg,
    });
  }
};

export const getSingleUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GetSingleUserRequest" });

    let link = `${BASE_URL}/api/v1/admin/users/get/${id}`;

    const data = await axios.get(link);

    console.log({ data });

    dispatch({
      type: "GetSingleUserSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "GetSingleUserFail",
      payload: error.response.data.msg,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteUserRequest" });

    let link = `${BASE_URL}/api/v1/admin/users/delete/${id}`;

    const data = await axios.delete(link);

    console.log({ data });

    dispatch({
      type: "DeleteUserSuccess",
      payload: data.data.success,
    });
  } catch (error) {
    dispatch({
      type: "DeleteUserFail",
      payload: error.response.data.msg,
    });
  }
};

export const updateUsers = (userData, id) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateUserRequest" });

    let link = `${BASE_URL}/api/v1/admin/users/update/${id}`;

    const data = await axios.put(link, userData, config);

    console.log({ data });

    dispatch({
      type: "UpdateUserSuccess",
      payload: data.data.success,
    });
  } catch (error) {
    dispatch({
      type: "UpdateUserFail",
      payload: error.response.data.msg,
    });
  }
};

export const addToWishlist = (VideoID) => async (dispatch) => {
  try {
    dispatch({ type: "WishListRequest" });

    let link = `${BASE_URL}/api/v1/me/addtowishlist`;

    const data = await axios.put(link, VideoID, config);

    console.log({ data });

    dispatch({
      type: "WishListSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "WishListFail",
      payload: error.response.data.msg,
    });
  }
};

export const ClearErrors = () => async (dispatch) => {
  dispatch({ type: "ClearErrors" });
};
