import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bottom-0 bg-[#00050d] text-white py-8 pt-10">
      <Link to="/" className="flex justify-center items-center font-semibold">
        Video Streamer
      </Link>
      <div className="flex justify-center items-center text-[0.8rem] my-2">
        <Link
          to="/"
          className="cursor-pointer text-yellow-400 hover:underline mr-5"
        >
          Home
        </Link>
        <Link
          to="/categories"
          className="cursor-pointer text-yellow-400 hover:underline mr-5"
        >
          Categories
        </Link>
        <Link
          to="/most_viewed"
          className="cursor-pointer text-yellow-400 hover:underline mr-5"
        >
          Most Viewed
        </Link>
        <Link
          to="/latest"
          className="cursor-pointer text-yellow-400 hover:underline mr-5"
        >
          New Videos
        </Link>
        <Link
          to="/helpline"
          className="cursor-pointer text-yellow-400 hover:underline"
        >
          Help
        </Link>
      </div>
      <div className="flex justify-center items-center text-[0.8rem]">
        <p> &#169; 2023 VideoStreamer Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;
