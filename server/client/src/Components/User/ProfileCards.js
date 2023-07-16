import React from "react";
import { Link } from "react-router-dom";

const ProfileCards = () => {
  return (
    <div className="grid grid-flow-rows grid-cols-2 gap-4 w-full">
      {/* ----------------------- */}
      <Link
        to="/contact"
        className="w-full h-[30vh] p-3 bg-gray-300 rounded-md shadow-sm hover:shadow-lg hover:scale-105 duration-200 flex flex-col justify-center items-center"
      >
        <img
          src="/contact.png"
          alt="contact us"
          className="w-full h-[20vh] object-contain rounded-md"
        />
        <h1 className="text-[1.1rem] font-medium mt-2">Contact Us</h1>
      </Link>
      {/* ----------------------- */}
      {/* ----------------------- */}
      <Link
        to="/about"
        className="w-full h-[30vh] p-3 bg-gray-300 rounded-md shadow-sm hover:shadow-lg hover:scale-105 duration-200 flex flex-col justify-center items-center"
      >
        <img
          src="/about.png"
          alt="about us"
          className="w-full h-[20vh] object-contain rounded-md"
        />
        <h1 className="text-[1.1rem] font-medium mt-2">About Us</h1>
      </Link>
      {/* ----------------------- */}

      {/* ----------------------- */}
      <Link
        to="https://www.buymeacoffee.com/gauravguptP"
        target="_blank"
        className="w-full h-[30vh] p-3 bg-gray-300 rounded-md shadow-sm hover:shadow-lg hover:scale-105 duration-200 flex flex-col justify-center items-center"
      >
        <img
          src="/support.png"
          alt="support us"
          className="w-full h-[20vh] object-contain rounded-md"
        />
        <h1 className="text-[1.1rem] font-medium mt-2">Buy me a Beer</h1>
      </Link>
      {/* ----------------------- */}
      {/* ----------------------- */}
      <Link
        to="/other_projects"
        className="w-full h-[30vh] p-3 bg-gray-300 rounded-md shadow-sm hover:shadow-lg hover:scale-105 duration-200 flex flex-col justify-center items-center"
      >
        <img
          src="/otherproject.png"
          alt="otherprojects us"
          className="w-full h-[20vh] object-contain rounded-md"
        />
        <h1 className="text-[1.1rem] font-medium mt-2">Other Projects</h1>
      </Link>
      {/* ----------------------- */}
    </div>
  );
};

export default ProfileCards;
