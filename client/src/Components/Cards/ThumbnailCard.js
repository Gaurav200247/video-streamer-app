import React, { useState } from "react";
import { BsCameraVideoFill, BsFillClockFill } from "react-icons/bs";
import "./ThumbnailCard.css";
import { Link } from "react-router-dom";

const ThumbnailCard = ({ data }) => {
  const styles = { boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" };

  const [isPlay, setIsPlay] = useState(false);

  const ShowAddBtn = (e) => {
    e.currentTarget.querySelector("button").classList.add("show-add-btn");
    setIsPlay(true);
  };

  const HideAddBtn = (e) => {
    e.currentTarget.querySelector("button").classList.remove("show-add-btn");
    setIsPlay(false);
  };

  return (
    <Link
      to={`/videos/${data && data._id}`}
      className="cursor-pointer mr-5 w-full h-[12rem] flex flex-col justify-between items-center  bg-slate-700 overflow-hidden relative rounded-md"
      style={styles}
      onMouseEnter={ShowAddBtn}
      onMouseLeave={HideAddBtn}
    >
      {/* image block*/}
      <div className="w-full h-full">
        {isPlay ? (
          <video
            src={`http://localhost:3000/api/v1/content/${
              data && data.video && data.video.VideoID
            }`}
            autoPlay
            muted
            loop
            className="w-full h-full bg-[#0f0f0f] pt-5 object-cover"
          ></video>
        ) : (
          <img
            src={`http://localhost:3000/api/v1/content/${
              data && data.thumbnail && data.thumbnail.ThumbnailID
            }`}
            alt="video_id"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {/* info block */}
      <button className="add-btn w-full h-auto flex flex-col justify-between items-start  text-black p-2">
        <p className="text-[0.8rem] lg:text-[0.9rem] text-left font-medium">
          <span className="mr-1 ">{data && data.title}</span>-
          <span className="ml-1">
            ({data && data.createdAt.substring(0, 4)})
          </span>
        </p>
        <p className="text-[0.6rem] lg:text-[0.7rem] flex justify-start items-center w-full">
          <span className="flex justify-center items-center mr-5 whitespace-nowrap">
            <BsFillClockFill className="mr-2" />
            {data &&
              data.video_length.hours !== 0 &&
              `${data.video_length.hours}h`}
            {data &&
              data.video_length.minutes !== 0 &&
              `${data.video_length.minutes}m`}
          </span>
          <span className="flex justify-center items-center mx-5 font-semibold whitespace-nowrap">
            <BsCameraVideoFill className="mr-2" /> {data && data.video_quality}
          </span>

          <span className="mx-5 font-bold bg-white px-[5px] py-[1px] whitespace-nowrap rounded-sm">
            {data && data.censor_ratings}
          </span>
        </p>
      </button>
    </Link>
  );
};

export default ThumbnailCard;
