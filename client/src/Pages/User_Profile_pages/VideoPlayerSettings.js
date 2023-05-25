import React, { useEffect, useState } from "react";
import UserSideBar from "../../Components/User/UserSideBar";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ClearErrors,
  loadUser,
  updateProfileSettings,
} from "../../Actions/UserAction";
import { useNavigate } from "react-router-dom";

const VideoPlayerSettings = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated } = useSelector((state) => state.updateProfile);

  const [IsVideoAutoPlay, setIsVideoAutoPlay] = useState(
    (user && user.user && user.user.autoPlay_videos) || false
  );
  const [IsTrailerAutoPlay, setIsTrailerAutoPlay] = useState(
    (user && user.user && user.user.autoPlay_trailers) || false
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }
    if (isUpdated) {
      toast.success("Settings Updated Successfully");
      dispatch({ type: "updateProfileSettingsReset" });

      dispatch(loadUser());

      naviagte("/account");
    }
  }, [error, dispatch, isUpdated, naviagte]);

  const SaveInfo = () => {
    const myForm = new FormData();
    myForm.set("autoPlay_trailers", IsTrailerAutoPlay);
    myForm.set("autoPlay_videos", IsVideoAutoPlay);

    dispatch(updateProfileSettings(myForm));
  };

  return (
    <div className="flex justify-between items-center w-full lg:h-[120vh]">
      <div className="w-0 overflow-hidden lg:w-[20%] h-full">
        <UserSideBar />
      </div>
      <div className="w-full lg:w-[80%] h-full bg-slate-500  text-black p-16">
        <h1 className="my-5 text-[1.3rem] text-white font-semibold">
          Video Player Settings
        </h1>

        <div className="flex flex-col justify-between items-center w-full bg-gray-200 rounded-md shadow-md">
          <div className="flex flex-col justify-between items-start w-full border-b-2 border-zinc-600 p-5">
            <h1 className="font-semibold text-[1.1rem]">AutoPlay Videos</h1>
            <p className="text-[0.9rem]">
              It starts the next available video automatically when ON
            </p>
            <Switch
              checked={IsTrailerAutoPlay}
              onChange={(e) => setIsTrailerAutoPlay(e.target.checked)}
            />
          </div>

          <div className="flex flex-col justify-between items-start w-full  p-5">
            <h1 className="font-semibold text-[1.1rem]">AutoPlay Trailers</h1>
            <p className="text-[0.9rem]">
              It automatically plays trailers while hovering on thumbnails when
              ON
            </p>
            <Switch
              checked={IsVideoAutoPlay}
              onChange={(e) => setIsVideoAutoPlay(e.target.checked)}
            />
          </div>
        </div>

        <div className="w-full flex justify-end items-center p-3">
          <button
            className="bg-yellow-400 hover:bg-blue-800 hover:text-white text-black rounded-md px-5 py-2 font-semibold shadow-md"
            onClick={SaveInfo}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerSettings;
