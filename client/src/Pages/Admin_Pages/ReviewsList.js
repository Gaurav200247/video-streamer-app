import React from "react";
import AdminSideBar from "../../Components/User/AdminSideBar";

const ReviewsList = () => {
  return (
    <div className="flex justify-between items-center w-full lg:h-[110vh]">
      {/* sidebar */}
      <div className="w-0 overflow-hidden lg:w-[20%] h-full">
        <AdminSideBar />
      </div>

      <div className="w-full lg:w-[80%] h-full bg-slate-500  text-black p-16">
        All Reviews
      </div>
    </div>
  );
};

export default ReviewsList;
