import React from "react";
import "./Loader.css";

const Loader = ({ msg }) => {
  return (
    <div className="flex flex-col p-3 text-white justify-center items-center bg-[#1e1d1d6b] z-30 w-full min-h-screen max-h-full">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="text-[0.9rem] my-5">{msg}</p>
    </div>
  );
};

export default Loader;
