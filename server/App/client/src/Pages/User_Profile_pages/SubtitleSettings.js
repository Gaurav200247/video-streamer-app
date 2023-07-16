import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ClearErrors,
  loadUser,
  updateProfileSettings,
} from "../../Actions/UserAction";
import UserSideBar from "../../Components/User/UserSideBar";

const SubtitleSettings = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated } = useSelector((state) => state.updateProfile);

  const [SubtitleValue, setSubtitleValue] = useState(
    (user && user.user && user.user.subtitle_preset) || 1
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
    myForm.set("subtitle_preset", SubtitleValue);

    dispatch(updateProfileSettings(myForm));
  };

  return (
    <div className="flex justify-between items-center w-full lg:h-[120vh]">
      <div className="w-0 overflow-hidden lg:w-[20%] h-full">
        <UserSideBar />
      </div>
      <div className="w-full lg:w-[80%] h-full bg-slate-500  text-black p-16">
        <h1 className="my-5 text-[1.3rem] text-white font-semibold">
          Subtitle Settings
        </h1>

        <div className="flex justify-start items-center flex-wrap w-[90%]">
          <div onClick={() => setSubtitleValue(1)}>
            <SubtitleSamples
              preset_number={1}
              classes="text-white"
              selected={SubtitleValue === 1 ? true : false}
            />
          </div>
          <div onClick={() => setSubtitleValue(2)}>
            <SubtitleSamples
              preset_number={2}
              classes="text-yellow-400"
              selected={SubtitleValue === 2 ? true : false}
            />
          </div>
          <div onClick={() => setSubtitleValue(3)}>
            <SubtitleSamples
              preset_number={3}
              classes="text-red-400"
              selected={SubtitleValue === 3 ? true : false}
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

export default SubtitleSettings;

export const SubtitleSamples = ({ classes, preset_number, selected }) => {
  return (
    <div
      className={`flex justify-center items-center w-[25rem] h-[14rem] relative rounded-md overflow-hidden  m-3
      hover:border-4 hover:border-sky-400 ${
        selected && "border-4 border-sky-400"
      }
    `}
    >
      <img
        src="https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="subtitle_background"
        className="w-full h-full object-cover brightness-75 "
      />
      <p
        className={`${classes} absolute bottom-2 shadow-md bg-[#00000080] px-2 py-1  text-[1rem]`}
      >
        {preset_number > 1
          ? `This is Subtitle preset ${preset_number - 1}`
          : "Default Subtitles"}
      </p>
    </div>
  );
};
