import React from "react";
import { MdError } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <div className="flex justify-start items-end">
        <img src="/wtf.png" alt="notFound" className="w-44" />

        <p className="ml-5 h-32 flex flex-col justify-between items-center text-[1.5rem] font-bold">
          <MdError className="text-[6rem] text-red-500" /> Error - 404 (Page Not
          Found!!)
        </p>
      </div>

      <p className="mt-12 text-[2rem] text-yellow-500 text-center">
        The requested URL was not found on this server
      </p>
    </div>
  );
};

export default NotFound;
