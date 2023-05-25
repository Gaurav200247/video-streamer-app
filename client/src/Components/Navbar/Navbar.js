import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiFillCaretDown, AiOutlineUser } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../Actions/UserAction.js";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showUserOptions, setShowUserOptions] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const Logout = () => {
    dispatch(logOutUser());
    navigate("/");
  };

  return (
    <nav className=" shadow-xl w-[95%] lg:w-[50%] z-[100] flex flex-col justify-between items-center m-auto fixed top-0 left-0 right-0">
      <div
        className="w-full flex justify-around items-center bg-[#00050d] rounded-md rounded-t-none p-3 lg:p-2 text-white 
       font-semibold"
      >
        {/* list */}
        <ul className="w-[80%] flex justify-between items-center text-[0.8rem] lg:text-[0.95rem]">
          {/* logo */}
          <li className="cursor-pointer">
            {/* <img src="" alt="logo" /> */}
            <Link to="/">Video Streamer</Link>
          </li>
          {/* links */}
          <Link
            to="/"
            className={`cursor-pointer hover:text-yellow-400 ${
              location.pathname === "/" &&
              "border-b-2 border-yellow-400 text-yellow-400"
            }`}
          >
            Home
          </Link>
          <Link
            to="/latest"
            className={`cursor-pointer hover:text-yellow-400 ${
              location.pathname === "/latest" &&
              "border-b-2 border-yellow-400 text-yellow-400"
            }`}
          >
            Latest
          </Link>
          <Link
            to="/most_viewed"
            className={`cursor-pointer hover:text-yellow-400 sm:flex hidden ${
              location.pathname === "/most_viewed" &&
              "border-b-2 border-yellow-400 text-yellow-400"
            }`}
          >
            Most Viewed
          </Link>
          <Link
            to="/categories"
            className={`cursor-pointer hover:text-yellow-400 flex justify-between items-center ${
              location.pathname === "/categories" &&
              "border-b-2 border-yellow-400 text-yellow-400"
            }`}
          >
            Categories
          </Link>
        </ul>

        {/* search Icon*/}
        <div
          className="cursor-pointer text-[1.2rem] lg:m-0 mx-3"
          onClick={() => setShowSearch(!showSearch)}
        >
          {showSearch ? <RxCross1 /> : <BsSearch />}
        </div>

        {/* user */}
        {isAuthenticated ? (
          <div
            className="relative cursor-pointer flex justify-between items-center"
            onClick={() => setShowUserOptions(!showUserOptions)}
          >
            <span className="cursor-pointer flex justify-between items-center">
              <img
                src={
                  user &&
                  user.user &&
                  user.user.avatar &&
                  user.user.avatar.url === "Sample_url"
                    ? `/happy.png`
                    : user.user.avatar.url
                }
                alt="123"
                className="w-6 h-6 shadow-lg rounded-full"
              />
              <AiFillCaretDown />
            </span>

            {showUserOptions && (
              <div className="text-[0.8rem] lg:text-[0.9rem] w-[7.5rem] top-[1.8rem] right-[-1rem] p-3 flex flex-col justify-between items-center  absolute rounded-md rounded-t-none bg-slate-800">
                <Link
                  to="/account"
                  className="m-1 p-1 lg:p-2 w-full whitespace-nowrap rounded-md   hover:text-slate-800 hover:bg-white"
                >
                  My Account
                </Link>
                <button
                  className="m-1 p-1 lg:p-2 flex justify-start w-full rounded-md   hover:text-slate-800 hover:bg-white"
                  onClick={Logout}
                >
                  LogOut
                </button>
                <Link
                  to="/helpline"
                  className="m-1 p-1 lg:p-2 w-full  rounded-md   hover:text-slate-800 hover:bg-white"
                >
                  FAQ
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div
            className="relative"
            onClick={() => setShowUserOptions(!showUserOptions)}
          >
            <span className="cursor-pointer flex justify-between items-center">
              <AiOutlineUser className="text-[1.3rem]" />
              <AiFillCaretDown />
            </span>

            {showUserOptions && (
              <div className="text-[0.8rem] lg:text-[0.9rem] top-[1.8rem] right-[-1rem] p-3 flex flex-col justify-between items-center  absolute rounded-md rounded-t-none bg-slate-800">
                <Link
                  to="/login"
                  className="m-1 p-1 lg:p-2  w-full rounded-md   hover:text-slate-800 hover:bg-white"
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  className="m-1 p-1 lg:p-2 w-full  rounded-md   hover:text-slate-800 hover:bg-white"
                >
                  SignUp
                </Link>
                <Link
                  to="/helpline"
                  className="m-1 p-1 lg:p-2 w-full  rounded-md   hover:text-slate-800 hover:bg-white"
                >
                  FAQ
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* search bar */}
      {showSearch && (
        <div className="flex justify-between items-center w-full bg-slate-800 rounded-md p-2">
          <form className="w-full p-1 flex justify-start items-center text-[1rem] lg:text-[1.3rem] bg-slate-700 rounded-md text-white">
            <BsSearch className="w-[10%] " />
            <input
              type="text"
              placeholder="Search"
              className="w-[80%] bg-transparent outline-none"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <Link
              to={`/search/${searchText}`}
              className="text-[0.8rem] lg:text-[1rem] cursor-pointer px-2 py-[3px] text-slate-100 rounded-md hover:text-black hover:bg-white"
            >
              Search
            </Link>
            {searchText && (
              <span
                onClick={() => setSearchText("")}
                className="text-[0.8rem] lg:text-[1rem] cursor-pointer px-2 py-[3px] text-slate-100 rounded-md hover:text-black hover:bg-white"
              >
                Clear
              </span>
            )}
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
