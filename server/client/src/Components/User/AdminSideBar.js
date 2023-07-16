import React from "react";
import { FiUsers } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbVideoPlus } from "react-icons/tb";
import { TfiVideoCamera } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const AdminSideBar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  // console.log({ location });

  return (
    <div className="w-full h-full bg-orange-300 text-black flex flex-col justify-start items-center">
      <Link
        to="/"
        className="text-center w-full p-5 text-[1.2rem] font-semibold mb-5 border-b-2 border-black"
      >
        Video Streamer
      </Link>

      <Link
        to="/account"
        className={`my-2 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 duration-150 hover:text-white hover:bg-red-500 ${
          location.pathname === "/account" && "bg-red-600 text-white"
        }`}
      >
        <img
          src={
            user &&
            user.user &&
            user.user.avatar &&
            user.user.avatar.url === "Sample_url"
              ? `/happy.png`
              : user.user.avatar.url
          }
          alt={(user && user.user && user.user.user_name) || "123"}
          className="w-7 h-7 shadow-lg rounded-full mr-3"
        />
        <p className="text-[0.9rem]">
          {(user && user.user && user.user.user_name) || "Account"}
        </p>
      </Link>

      <Link
        to="/admin/dashboard"
        className={`my-3 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 duration-150 hover:text-white hover:bg-red-500 ${
          location.pathname === "/admin/dashboard" && "bg-red-600 text-white"
        }`}
      >
        <MdOutlineDashboard className="mr-5 text-[1.2rem]" />{" "}
        <p className="text-[0.9rem]">Dashboard</p>
      </Link>

      <Link
        to="/admin/videos/post"
        className={`my-3 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 duration-150 hover:text-white hover:bg-red-500 ${
          location.pathname === "/admin/videos/post" && "bg-red-600 text-white"
        }`}
      >
        <TbVideoPlus className="mr-5 text-[1.2rem]" />{" "}
        <p className="text-[0.9rem]">Add Video</p>
      </Link>

      <Link
        to="/admin/videos"
        className={`my-3 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 duration-150 hover:text-white hover:bg-red-500 ${
          location.pathname === "/admin/videos" && "bg-red-600 text-white"
        }`}
      >
        <TfiVideoCamera className="mr-5 text-[1.2rem]" />{" "}
        <p className="text-[0.9rem]">All Videos</p>
      </Link>

      <Link
        to="/admin/users"
        className={`my-3 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 duration-150 hover:text-white hover:bg-red-500 ${
          location.pathname === "/admin/users" && "bg-red-600 text-white"
        }`}
      >
        <FiUsers className="mr-5 text-[1.2rem]" />
        <p className="text-[0.9rem]">All Users List</p>
      </Link>
    </div>
  );
};

export default AdminSideBar;
