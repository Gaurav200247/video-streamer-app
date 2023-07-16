import React, { useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProfileCards from "../../Components/User/ProfileCards";
import UserSideBar from "../../Components/User/UserSideBar";
import { IoPersonAdd } from "react-icons/io5";
import { RiAdminLine, RiLockPasswordFill } from "react-icons/ri";
import { BiListPlus } from "react-icons/bi";
import { FiLogOut, FiMail } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import Loader from "../../Components/Loader/Loader";
import { logOutUser } from "../../Actions/UserAction";
import { getSingleVideoDetails } from "../../Actions/VideosAction";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { user,loading } = useSelector((state) => state.getMyDetails);

  const { video, loading: videoLoading } = useSelector(
    (state) => state.getSingleVideoDetails
  );

  const Logout = () => {
    dispatch(logOutUser());
    navigate("/");
  };

  const [Continue_Watching, setContinue_Watching] = useState(
    user &&
      user.user &&
      user.user.watch_history &&
      user.user.watch_history.length > 0 &&
      user.user.watch_history[user.user.watch_history.length - 1]
  );

  useEffect(() => {
    dispatch(getSingleVideoDetails(Continue_Watching));
  }, [Continue_Watching, dispatch]);

  return loading ? (
    <Loader msg="Loading Profile, Please wait..." />
  ) : (
    <div className="flex justify-between items-center w-full lg:h-[110vh]">
      {/* sidebar */}
      <div className="w-0 overflow-hidden md:w-[20%] h-full">
        <UserSideBar />
      </div>

      {/* user Info */}
      <div className="w-full lg:w-[80%] h-full bg-slate-500  text-black lg:p-16 py-16 px-5">
        <div className="w-full h-full flex flex-col justify-between items-center lg:items-start  md:grid md:grid-flow-rows md:grid-cols-3 ">
          {/* profile Simple btns */}
          <div className="w-full row-span-2 bg-gray-300 rounded-md shadow-sm hover:shadow-lg p-5 mb-5 flex flex-col justify-start items-center">
            {/*Avatar Image */}
            <img
              src={
                user &&
                user.user &&
                user.user.avatar &&
                user.user.avatar.url === "Sample_url"
                  ? `/happy.png`
                  : user.user.avatar.url
              }
              alt={user && user.user && user.user._id}
              className="w-[9rem] h-[9rem] mt-5 mb-3 rounded-[100%] object-cover shadow-sm"
            />

            <p className="text-[1.5rem] font-semibold mb-3">
              {user && user.user && user.user.user_name}
            </p>

            <p className="mt-1 flex justify-between items-center text-[0.9rem] text-gray-600">
              <FiMail className="mr-2 " />{" "}
              {user && user.user && user.user.email}
            </p>

            <div className=" mt-6 grid grid-cols-3 w-full rounded-md overflow-hidden">
              <SimpleBtns icon={<GoHome />} to="/" />

              <SimpleBtns icon={<IoPersonAdd />} to="/account/update" />

              <SimpleBtns
                icon={<RiLockPasswordFill />}
                to="/account/update/password"
              />

              <SimpleBtns icon={<BiListPlus />} to="/account/wishlist" />

              <SimpleBtns icon={<BsClockHistory />} to="/account/history" />

              <button
                onClick={Logout}
                className="flex justify-center items-center p-4 border-2 border-slate-300 bg-slate-400 hover:bg-black hover:text-white text-[1.5rem]"
              >
                <FiLogOut />
              </button>

              {user && user.user && user.user.role === "admin" && (
                <SimpleBtns icon={<RiAdminLine />} to="/admin/dashboard" />
              )}
            </div>
          </div>

          {/* Continue Watching */}
          {Continue_Watching && !videoLoading && video && video.video && (
            <Link
              to={`/videos/${Continue_Watching}`}
              className="lg:w-auto w-full  bg-gray-300 rounded-md shadow-sm hover:shadow-lg p-3 m-5 mt-0 hover:scale-105 duration-200 flex flex-col justify-between items-center"
            >
              <h1 className="text-[1.2rem] font-medium text-center mb-5">
                Continue Watching
              </h1>
              <img
                src={video.video.thumbnail.ThumbnailURL}
                alt="Continue Watching"
                className="w-full h-full lg:h-[90%] object-cover rounded-sm"
              />
              <h1 className="text-[0.9rem] text-center mt-2 ">
                {video.video.title}
              </h1>
            </Link>
          )}

          {!Continue_Watching && (
            <div className="lg:w-auto w-full  bg-gray-300 rounded-md shadow-sm hover:shadow-lg p-3 m-5 mt-0 hover:scale-105 duration-200 flex flex-col justify-between items-center">
              <h1 className="text-[1.2rem] font-medium text-center mb-5">
                Continue Watching
              </h1>

              <img
                src="/sad.png"
                alt="Continue Watching"
                className="w-full h-full lg:h-[90%] object-cover rounded-sm"
              />

              <h1 className="text-[0.9rem] text-center mt-2 ">
                It looks like you did'nt watch anything
              </h1>
            </div>
          )}

          {/* profile Cards */}
          <ProfileCards />
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const SimpleBtns = ({ icon, to }) => {
  return (
    <Link
      to={to}
      className="flex justify-center items-center p-4 border-2 border-slate-300 bg-slate-400 hover:bg-black hover:text-white text-[1.5rem]"
    >
      {icon}
    </Link>
  );
};
