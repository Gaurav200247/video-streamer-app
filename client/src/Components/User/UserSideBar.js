import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { RiAdminLine, RiLockPasswordFill } from "react-icons/ri";
import { BiListPlus } from "react-icons/bi";
import { BsClockHistory } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logOutUser } from "../../Actions/UserAction";

const UserSideBar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(logOutUser());
    navigate("/");
  };

  const location = useLocation();

  return (
    <div className="w-full h-full from-slate-900 to-zinc-900 flex flex-col justify-start items-center ">
      <Link
        to="/"
        className="text-center w-full p-5 text-[1.2rem] font-semibold mb-5 hover:text-yellow-500 bg-[#1f283e] border-b-2 border-white"
      >
        Video Streamer
      </Link>

      <Link
        to="/account"
        className={`my-2 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 hover:text-yellow-500 hover:bg-[#1f283e] ${
          location.pathname === "/account" && "bg-[#1f283e] text-yellow-500"
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

      {user && user.user && user.user.role === "admin" && (
        <Link
          to="/admin/dashboard"
          className={`my-2 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 hover:text-yellow-500 hover:bg-[#1f283e] ${
            location.pathname === "/admin/dashboard" &&
            "bg-[#1f283e] text-yellow-500"
          }`}
        >
          <RiAdminLine className="mr-5 text-[1.2rem]" />{" "}
          <p className="text-[0.9rem]"> Admin</p>
        </Link>
      )}

      <Link
        to="/account/update"
        className={`my-2 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 hover:text-yellow-500 hover:bg-[#1f283e] ${
          location.pathname === "/account/update" &&
          "bg-[#1f283e] text-yellow-500"
        }`}
      >
        <IoPersonAdd className="mr-5 text-[1.2rem]" />{" "}
        <p className="text-[0.9rem]"> Update Account</p>
      </Link>

      <Link
        to="/account/update/password"
        className={`my-2 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 hover:text-yellow-500 hover:bg-[#1f283e] ${
          location.pathname === "/account/update/password" &&
          "bg-[#1f283e] text-yellow-500"
        }`}
      >
        <RiLockPasswordFill className="mr-5 text-[1.2rem]" />{" "}
        <p className="text-[0.9rem]"> Update Password</p>
      </Link>

      <Link
        to="/account/wishlist"
        className={`my-2 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 hover:text-yellow-500 hover:bg-[#1f283e] ${
          location.pathname === "/account/wishlist" &&
          "bg-[#1f283e] text-yellow-500"
        }`}
      >
        <BiListPlus className="mr-5 text-[1.2rem]" />
        <p className="text-[0.9rem]"> Access Wishlist</p>
      </Link>

      <Link
        to="/account/history"
        className={`my-2 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 hover:text-yellow-500 hover:bg-[#1f283e] ${
          location.pathname === "/account/history" &&
          "bg-[#1f283e] text-yellow-500"
        }`}
      >
        <BsClockHistory className="mr-5 text-[1.2rem]" />{" "}
        <p className="text-[0.9rem]"> Watch History</p>
      </Link>

      <button
        className="my-2 flex justify-start items-center w-[85%] rounded-3xl px-5 py-3 hover:text-yellow-500 hover:bg-[#1f283e]"
        onClick={Logout}
      >
        <FiLogOut className="mr-5 text-[1.2rem]" />{" "}
        <p className="text-[0.9rem]"> LogOut</p>
      </button>
    </div>
  );
};

export default UserSideBar;
