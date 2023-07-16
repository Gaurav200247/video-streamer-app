import React, { useEffect, useState } from "react";
import {
  BsFillCalendar2Fill,
  BsFillCameraVideoFill,
  BsFillClockFill,
  BsPlayCircle,
  BsPlusCircle,
} from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  UpdateVideoView,
  getAllVideos,
  getSingleVideoDetails,
} from "../Actions/VideosAction";
import { Slider1 } from "../Components/Sliders/Sliders";
import Loader from "../Components/Loader/Loader";
import { AiFillLike } from "react-icons/ai";
import { toast } from "react-toastify";
import { addToWishlist } from "../Actions/UserAction";
import { MdBookmarkAdded } from "react-icons/md";

const VideoDetails = () => {
  const shadowStyles = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  };
  const { id } = useParams();
  const dispatch = useDispatch();

  const { video, loading } = useSelector(
    (state) => state.getSingleVideoDetails
  );

  useEffect(() => {
    dispatch(getSingleVideoDetails(id));
  }, [dispatch, id]);

  const [isPlay, setIsPlay] = useState(false);

  const { videos } = useSelector((state) => state.getAllVideos);

  useEffect(() => {
    dispatch(getAllVideos("", [], 5, 1, true));
  }, [dispatch]);

  let featuredVideos =
    videos &&
    videos.videos &&
    videos.videos.length > 0 &&
    videos.videos.filter((item) => item.featured === true);

  let videoDate =
    video && video.video && video.video.createdAt.substring(0, 10).split("-");

  let videoDateString =
    video &&
    video.video &&
    `${videoDate[2]} ${month[Number(videoDate[1]) - 1]} ${videoDate[0]}`;

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { viewData } = useSelector((state) => state.VideoViews);

  const OpenPlayer = () => {
    setIsPlay(true);

    if (isAuthenticated) {
      dispatch(UpdateVideoView(video.video._id));
    }
  };

  const { wishlistResponse, loading: wishlistLoading } = useSelector(
    (state) => state.wishlist
  );

  const AddToWishListHandler = (videoID) => {
    console.log(videoID);
    if (isAuthenticated) {
      const myForm = new FormData();
      myForm.set("videoID", videoID);

      dispatch(addToWishlist(myForm));
    } else {
      toast.warning("Please login to access this feature...");
    }
  };

  // boolean
  const [IsInList, setIsInList] = useState(null);

  useEffect(() => {
    setIsInList(
      user &&
        user.user &&
        user.user.wishList &&
        user.user.wishList.length > 0 &&
        user.user.wishList.includes(video && video.video && video.video._id)
    );
  }, [user, video]);

  useEffect(() => {
    if (wishlistResponse && wishlistResponse.isIncluded) {
      toast.success(wishlistResponse.msg);
      setIsInList(wishlistResponse.isIncluded);
    }
    if (wishlistResponse && !wishlistResponse.isIncluded) {
      toast.warning(wishlistResponse.msg);
      setIsInList(wishlistResponse.isIncluded);
    }

    dispatch({ type: "WishListReset" });
  }, [wishlistResponse, dispatch]);

  // console.log({ wishlistResponse, IsInList });

  // console.log({ myvideo: video.video.video.videoURL });

  return loading ? (
    <Loader msg="Fetching details, Please wait..." />
  ) : wishlistLoading ? (
    <Loader msg="Adding to your  wishlist, Please wait..." />
  ) : (
    <div className="relative w-full flex flex-col justify-between items-start">
      {/* video container */}
      {isPlay && (
        <div className="absolute top-0 left-0 w-full h-screen z-[500] bg-black flex flex-col justify-between items-center">
          <div className="w-[95%] relative h-[90%] bg-black rounded-md overflow-hidden">
            <video
              src={video.video.video.videoURL}
              controls
              className="w-full h-full bg-[#0f0f0f] pt-5 object-cover"
            ></video>

            {/* upper options */}
            <div className="absolute top-0 left-0 w-full flex justify-end items-center p-5">
              <button
                onClick={() => setIsPlay(false)}
                className="text-[1.5rem] text-slate-400 hover:text-white"
              >
                <RxCross1 />
              </button>
            </div>
          </div>

          {/*------------------- lower options ------------------- */}
          <div className="w-full flex justify-between items-center p-5 lg:px-8 text-slate-200 bg-[#0f0f0f] text-[0.8rem] lg:text-[0.9rem] shadow-2xl">
            {/* right options / like dislike buttons */}
            {/* <div className="flex justify-start items-center w-[50%]">
              <span
                className={`flex justify-center items-center  mx-3  cursor-pointer whitespace-nowrap ${
                  Review.like === true && "text-blue-500"
                }`}
                onClick={() => ReviewHandler(true, false)}
              >
                <AiFillLike className="mr-1" /> Like
              </span>

              <span
                className={`flex justify-center items-center  mx-3  cursor-pointer whitespace-nowrap ${
                  Review.like === false && "text-red-500"
                }`}
                onClick={() => ReviewHandler(false, true)}
              >
                <AiFillDislike className="mr-1" /> Dislike
              </span>
            </div> */}

            {/* Left oPtions */}
            <div className="flex justify-end items-center w-full ">
              <span className="flex justify-center items-center  mx-3 cursor-default whitespace-nowrap">
                {viewData && viewData.views
                  ? viewData.views
                  : video && video.video && video.video.views}{" "}
                views
              </span>

              <span className="flex justify-center items-center mx-3 cursor-default whitespace-nowrap">
                {videoDate[1] &&
                  videoDate[2] &&
                  month[Number(videoDate[1]) - 1] &&
                  videoDateString}
              </span>

              <span className="flex justify-center items-center mx-3 font-bold cursor-default whitespace-nowrap">
                {video.video.video_quality}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Upper container */}
      <div className="w-full h-screen relative flex flex-col justify-between items-start">
        {/* poster */}
        <div className="absolute w-full h-screen top-0 left-0 z-[0] ">
          <img
            src={
              video &&
              video.video &&
              video.video.cover_page &&
              video.video.cover_page.CoverPageURL
            }
            alt={video && video.video && video.video._id}
            className="w-full h-full object-cover brightness-[1.4]"
          />{" "}
          {/*poster filter */}
          <div className="absolute top-0 w-[100%] h-full bg-gradient-to-r  from-[black] via-[#000000ce] to-transparent"></div>
          <div className="absolute top-0 w-[100%] h-full bg-gradient-to-t from-[#000000] via-transparent to-transparent"></div>
        </div>

        {/* Main Details */}
        <div className="absolute bottom-0 left-0 p-14 pb-14 w-full lg:w-[70%]  h-full  z-10 flex flex-col justify-end items-start">
          {/* details */}
          <div className="w-full p-3 pb-7">
            {/* title */}
            <h1 className="text-[3rem] font-medium">
              {video && video.video && video.video.title}
            </h1>

            {/* synopsis */}
            <p className="text-[1rem] mt-2">
              {video && video.video && video.video.synopsis}
            </p>

            {/* simple details */}
            <div className="flex justify-start items-center text-[0.9rem] font-semibold my-3 text-slate-300">
              <div className="flex justify-between items-center whitespace-nowrap ">
                <AiFillLike /> :{" "}
                {video && video.video && video.video.numOfReviews}
              </div>
              <div className="flex justify-between items-center">
                <BsFillClockFill className="mr-[0.4rem] ml-3 text-white" />
                {video &&
                  video.video &&
                  video.video.video_length.hours !== 0 &&
                  `${video.video.video_length.hours}h`}
                {video &&
                  video.video &&
                  video.video.video_length.minutes !== 0 &&
                  `${video.video.video_length.minutes}m`}
              </div>
              <div className="flex justify-between items-center">
                <BsFillCameraVideoFill className="mr-[0.4rem] ml-3 text-white" />{" "}
                {video && video.video && video.video.video_quality}
              </div>
              <div className="flex justify-between items-center">
                <BsFillCalendar2Fill className="mr-[0.4rem] ml-3 text-white" />{" "}
                {video && video.video && video.video.createdAt.substring(0, 4)}
              </div>
              <div className="mx-5 font-bold bg-[#ffffffe4] text-black px-[4px] py-[1px] whitespace-nowrap rounded-sm">
                {video && video.video && video.video.censor_ratings}
              </div>
            </div>
          </div>

          {/* genres */}
          <p className="flex justify-start items-center pl-3">
            {video &&
              video.video &&
              video.video.tags.length > 0 &&
              video.video.tags.map((item, index) => {
                return (
                  <Link
                    to={`/categories/${item}`}
                    key={index}
                    className="mr-2 underline"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                );
              })}
          </p>

          {/* Options */}
          <div className="flex justify-start items-center mt-2 p-2">
            {/* play btn */}
            <span className="flex justify-between items-center text-[1.2rem]">
              <button onClick={OpenPlayer}>
                {" "}
                <BsPlayCircle
                  style={shadowStyles}
                  className="text-[4rem] cursor-pointer mr-3 duration-150 hover:bg-white hover:text-black rounded-[100%] p-1 bg-black "
                />
              </button>
              Play
            </span>

            {/* sub-options */}
            <p className="ml-24 flex justify-between items-center">
              {/* add to wishlist button */}
              <button
                style={shadowStyles}
                className="mx-[5px] text-[2rem] duration-150 hover:bg-white hover:text-black rounded-[100%] p-1 bg-black"
                onClick={() =>
                  AddToWishListHandler(video && video.video && video.video._id)
                }
              >
                {/* <BsPlusCircle /> */}
                {IsInList && <MdBookmarkAdded />}
                {IsInList === false && <BsPlusCircle />}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* recomendations */}
      <div className="bg-black w-full">
        <Slider1 Heading="Related Videos" data={featuredVideos} />
      </div>

      {/* more Info */}
      <div className="bg-black w-full flex-col justify-between items-start px-10 lg:px-12 pt-5 ">
        <h1 className="text-[1.5rem] font-semibold">More Info</h1>

        <div className="my-5 ml-2">
          <h1 className=" font-bold mb-1">Content Advisory</h1>
          <p className="ml-5 text-gray-400">
            {video &&
            video.video &&
            video.video.censor_ratings &&
            video.video.censor_ratings === "U/A 13+"
              ? "Suitable for all ages."
              : video &&
                video.video &&
                video.video.censor_ratings &&
                video.video.censor_ratings === "U/A 16+"
              ? "Not recommended for a younger audience but not restricted."
              : video &&
                video.video &&
                video.video.censor_ratings &&
                video.video.censor_ratings === "U/A 18+"
              ? "Restricted for a younger audience."
              : video &&
                video.video &&
                video.video.censor_ratings &&
                video.video.censor_ratings === "A"
              ? "Suitable to certain viewers and restricted for a younger audience."
              : video &&
                video.video &&
                video.video.censor_ratings &&
                video.video.censor_ratings}
          </p>
        </div>

        <div className="my-5 ml-2">
          <h1 className=" font-bold mb-1">Audio Languages</h1>
          <p className="ml-5 text-gray-400">
            {video && video.video && video.video.audio_language}
          </p>
        </div>
      </div>

      {/* line */}
      <div className="flex justify-center bg-black items-center w-full lg:py-10 py-5">
        <div className="p-[1px] bg-gray-300 w-[95%]"></div>
      </div>

      {/* feedback */}
      <div className="bg-black w-full flex-col justify-between items-start pl-12  ">
        <div className="lg:mt-10 mb-5 font-bold  ml-2">
          <h1 className="mb-2 text-[1.3rem]">Support</h1>
          <Link to="/helpline" className="underline text-[0.9rem]">
            Get Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;

export const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
