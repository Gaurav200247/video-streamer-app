import { BASE_URL } from "./BASE_URL";
import axios from "axios";

export const getAllVideos =
  (title = "", tags = [], currentPage = 1, mostViewed = false, all = false) =>
  async (dispatch) => {
    try {
      dispatch({ type: "GetAllVideosRequest" });
      let link = "";

      if (!all) {
        link = `${BASE_URL}/api/v1/videos?title=${title}&tags=${tags}&page=${currentPage}&mostViewed=${mostViewed}&limit=${12}`;
      } else {
        link = `${BASE_URL}/api/v1/videos`;
      }
      // console.log({ link });

      const data = await axios.get(link);

      dispatch({ type: "GetAllVideosSuccess", payload: data.data });
    } catch (error) {
      dispatch({ type: "GetAllVideosFail", payload: error.response.data.msg });
    }
  };

export const getSingleVideoDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GetSingleVideoDetailsRequest" });

    let link = `${BASE_URL}/api/v1/videos/${id}`;

    const data = await axios.get(link);

    // console.log({ data });

    dispatch({
      type: "GetSingleVideoDetailsSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "GetSingleVideoDetailsFail",
      payload: error.response.data.msg,
    });
  }
};

export const postVideoAction = (VideoData) => async (dispatch) => {
  try {
    dispatch({ type: "PostVideoRequest" });

    let link = `${BASE_URL}/api/v1/videos`;

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const data = await axios.post(link, VideoData, config);

    console.log({ data });

    dispatch({
      type: "PostVideoSuccess",
      payload: data.data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "PostVideoFail",
      payload: error.response.data.msg,
    });
  }
};

export const deleteVideoAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteVideoRequest" });

    let link = `${BASE_URL}/api/v1/videos/${id}`;

    const data = await axios.delete(link);

    console.log({ data });

    dispatch({
      type: "DeleteVideoSuccess",
      payload: data.data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "DeleteVideoFail",
      payload: error.response.data.msg,
    });
  }
};

export const updateVideoAction = (VideoData, id) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateVideoRequest" });

    let link = `${BASE_URL}/api/v1/videos/${id}`;

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const data = await axios.put(link, VideoData, config);

    console.log({ data });

    dispatch({
      type: "UpdateVideoSuccess",
      payload: data.data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "UpdateVideoFail",
      payload: error.response.data.msg,
    });
  }
};

export const createReview = (review) => async (dispatch) => {
  console.log(review);
  try {
    dispatch({ type: "CreateUpdateReviewRequest" });

    let link = `${BASE_URL}/api/v1/review`;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const data = await axios.put(link, review, config);

    console.log({ data });

    dispatch({
      type: "CreateUpdateReviewSuccess",
      payload: data.data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "CreateUpdateReviewFail",
      payload: error.response.data.msg,
    });
  }
};

export const deleteReview = (videoID, reviewID) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteReviewRequest" });

    let link = `${BASE_URL}/api/v1/review?videoID=${videoID}&reviewID=${reviewID}`;

    const data = await axios.delete(link);

    console.log({ data });

    dispatch({
      type: "DeleteReviewSuccess",
      payload: data.data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "DeleteReviewFail",
      payload: error.response.data.msg,
    });
  }
};

export const UpdateVideoView = (videoID) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateVideoViewRequest" });

    let link = `${BASE_URL}/api/v1/videos/views/${videoID}`;

    const config = { headers: { "Content-Type": "application/json" } };

    const data = await axios.put(link, config);

    // console.log({ data });

    dispatch({
      type: "UpdateVideoViewSuccess",
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "UpdateVideoViewFail",
      payload: error.response.data.msg,
    });
  }
};

export const ClearErrors = () => async (dispatch) => {
  dispatch({ type: "ClearErrors" });
};
