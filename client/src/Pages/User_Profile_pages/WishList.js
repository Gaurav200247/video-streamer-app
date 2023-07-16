import React, { useEffect } from "react";
import { BsFillCameraVideoFill, BsFillClockFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserSideBar from "../../Components/User/UserSideBar";
import { getAllVideos } from "../../Actions/VideosAction";
import { getMyDetails } from "../../Actions/UserAction";

const WishList = () => {
  const { user } = useSelector((state) => state.getDetails);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyDetails());
  }, [dispatch]);

  let UserWishList =
    user &&
    user.user &&
    user.user.wishList &&
    user.user.wishList.length > 0 &&
    user.user.wishList;

  let newList = UserWishList && UserWishList.slice().reverse();

  // console.log({ newList });

  return (
    <div className="flex justify-between items-start w-full lg:h-[120vh] h-[80vh]">
      <div className="w-0 overflow-hidden lg:w-[20%] h-full">
        <UserSideBar />
      </div>

      <div className="w-full lg:w-[80%] h-full bg-slate-500  text-black lg:p-16 py-16 px-5 ">
        {" "}
        <h1 className="w-full text-left text-[1.4rem] font-semibold py-3 text-white">
          Your WishList
        </h1>
        {newList ? (
          <div className="w-full shadow-md bg-gray-200 max-h-[80vh] rounded-md overflow-y-scroll flex flex-col justify-between items-center ">
            {newList.map((item, index) => {
              return <SingleItem key={index} VideoID={item} />;
            })}
          </div>
        ) : (
          <h1>List is Empty</h1>
        )}
      </div>
    </div>
  );
};

export default WishList;

export const SingleItem = ({ VideoID }) => {
  // console.log(VideoID);
  const { videos } = useSelector((state) => state.getAllVideos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideos("", [], 1, false, true));
  }, [dispatch]);

  let Data =
    videos &&
    videos.videos &&
    videos.videos.length > 0 &&
    videos.videos.find((singleVideo) => singleVideo._id === VideoID);

  // console.log({ Data });

  return (
    <Link
      to={`/videos/${VideoID}`}
      className="flex duration-200 hover:shadow-md p-5 border-b-2 border-zinc-400 justify-between items-center w-full"
    >
      <img
        src={Data && Data.thumbnail && Data.thumbnail.ThumbnailURL}
        alt={VideoID}
        className="w-[10%] rounded-sm"
      />

      <h1 className="w-[50%] text-left">{Data && Data.title}</h1>

      <div className="lg:w-[20%] w-[30%] flex justify-start items-center text-[0.9rem] font-semibold my-3 whitespace-nowrap ">
        <div className="flex justify-between items-center">
          <BsFillClockFill className="mr-[0.4rem] ml-3 " />
          {Data &&
            Data.video_length &&
            Data.video_length.hours !== 0 &&
            `${Data && Data.video_length && Data.video_length.hours}h`}
          {Data &&
            Data.video_length &&
            Data.video_length.minutes !== 0 &&
            `${Data && Data.video_length && Data.video_length.minutes}m`}
        </div>
        <div className="flex justify-between items-center">
          <BsFillCameraVideoFill className="mr-[0.4rem] ml-3 " />{" "}
          {Data && Data.video_quality}
        </div>
      </div>
    </Link>
  );
};
