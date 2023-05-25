import React, { useState } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import {
  BsFillClockFill,
  BsCameraVideoFill,
  BsPlayCircle,
  BsFillCameraVideoFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Sliders.css";
import Loader from "../Loader/Loader";

export const Slider1 = ({ Heading, data }) => {
  const ScrollRight = (e) => {
    e.currentTarget.parentElement.children[1].scrollLeft += 200;
  };

  const ScrollLeft = (e) => {
    e.currentTarget.parentElement.children[1].scrollLeft -= 200;
  };

  return data && data.length > 0 ? (
    <div className="w-full h-[14rem]  lg:h-[18rem] my-5 lg:my-10  ">
      <h1 className="mx-7 font-semibold text-[1.3rem] lg:text-[1.5rem]">
        {Heading}
      </h1>

      <div className="mt-[1.5rem] w-[96%] mx-5 lg:mx-7 h-[70%]  flex justify-between items-center">
        {/* left btn */}
        <button
          className="w-[2%] lg:w-[1.5rem] h-[93%] bg-zinc-800 rounded-l-md  flex justify-center items-center text-[0.9rem] lg:text-2xl hover:bg-[#29292956] duration-100 "
          onClick={ScrollLeft}
        >
          <AiOutlineLeft />
        </button>
        {/* horizonatl scroller */}
        <div
          className="py-3 w-[96%] grid grid-flow-col auto-cols-auto gap-1 overflow-x-auto overscroll-contain snap-mandatory snap-x scroll-px-1 "
          id="scroller"
        >
          {/* elements */}
          {data &&
            data.map((item, index) => {
              return <SliderCard1 key={index} item={item} />;
            })}
        </div>
        {/* right btn */}
        <button
          className="w-[2%] lg:w-[1.5rem] h-[93%] bg-zinc-800 rounded-r-md  flex justify-center items-center text-[0.9rem] lg:text-2xl hover:bg-[#29292956] duration-100 "
          onClick={ScrollRight}
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  ) : (
    <Loader msg="Loading Content, Please wait..." />
  );
};

export const SliderCard1 = ({ item }) => {
  const styles = { boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" };

  return (
    <Link
      to={`/videos/${item._id}`}
      className="cursor-pointer mr-5 w-[13rem] h-[9rem] lg:w-[19rem] lg:h-[13rem] flex flex-col justify-between items-center rounded-md  bg-slate-700 overflow-hidden snap-start  duration-300"
      style={styles}
    >
      {/* image block*/}
      <div className="w-full  h-[70%]">
        <img
          src={`http://localhost:3000/api/v1/content/${
            item.thumbnail && item.thumbnail.thumbnailID
          }`}
          alt={item._id}
          className="w-full h-full object-cover hover:scale-105 duration-300"
        />
      </div>
      {/* info block */}
      <div className="w-full  h-[30%] flex flex-col justify-between items-start p-2 bg-slate-700 ">
        <p className="text-[0.7rem] lg:text-[0.9rem]">
          <span>
            {item.title.length > 28
              ? `${item.title.substring(0, 18)}...`
              : item.title}
          </span>
          -<span>({item.createdAt.substring(0, 4)})</span>
        </p>
        <p className="text-[0.5rem] lg:text-[0.8rem] flex justify-start items-center w-full">
          <span className="flex justify-center items-center mr-5 whitespace-nowrap">
            <BsFillClockFill className="mr-2" />
            {item.video_length.hours}h {item.video_length.minutes}m
          </span>
          <span className="flex justify-center items-center mx-5 font-semibold whitespace-nowrap">
            <BsCameraVideoFill className="mr-2" />
            {item.video_quality}
          </span>

          <span className="mx-5 font-bold bg-slate-900 px-[5px] py-[1px] rounded-sm whitespace-nowrap">
            {item.censor_ratings}
          </span>
        </p>
      </div>
    </Link>
  );
};

export const Slider2 = ({ Heading, data }) => {
  return data && data.length > 0 ? (
    <div className="w-full">
      <h1 className="ml-7 lg:ml-7 my-3 font-semibold text-[1.3rem] lg:text-[1.5rem]">
        {Heading}
      </h1>

      {/* horizonatl scroller */}
      <div className="py-3 w-[94%] mx-7 grid grid-flow-col auto-cols-auto gap-1 overflow-x-auto overscroll-contain snap-mandatory snap-x scroll-px-1">
        {/* elements */}
        {data &&
          data.map((item, index) => {
            return <SliderCard2 key={index} item={item} />;
          })}
      </div>
    </div>
  ) : (
    <Loader msg="Loading Content, Please wait..." />
  );
};

export const SliderCard2 = ({ item }) => {
  const styles = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  };

  const shadowStyles = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  };

  const [isPlay, setIsPlay] = useState(false);

  const ShowInfo = (e) => {
    e.currentTarget.children[1].classList.add("filter_show");
    e.currentTarget.children[1].classList.remove("filter_hide");
    e.currentTarget.children[2].classList.add("filter_show");
    e.currentTarget.children[2].classList.remove("filter_hide");
    e.currentTarget.children[3].classList.add("show");
    e.currentTarget.children[3].classList.remove("hide");
    e.currentTarget.classList.remove("decreaseW");
    e.currentTarget.classList.add("increaseW");
    setIsPlay(true);
  };

  const HideInfo = (e) => {
    e.currentTarget.children[1].classList.remove("filter_show");
    e.currentTarget.children[1].classList.add("filter_hide");
    e.currentTarget.children[2].classList.remove("filter_show");
    e.currentTarget.children[2].classList.add("filter_hide");
    e.currentTarget.children[3].classList.add("hide");
    e.currentTarget.children[3].classList.remove("show");
    e.currentTarget.classList.add("decreaseW");
    e.currentTarget.classList.remove("increaseW");
    setIsPlay(false);
  };

  return (
    <Link
      to={`/videos/${item._id}`}
      className={`decreaseW duration-300 cursor-pointer mr-5 h-[20rem] lg:h-[28rem] flex flex-col justify-between items-center rounded-md  bg-slate-700 overflow-hidden snap-start relative`}
      style={styles}
      onMouseOver={ShowInfo}
      onMouseLeave={HideInfo}
    >
      {/* image block*/}
      <div className="w-full h-full">
        {isPlay ? (
          <video
            src={`http://localhost:3000/api/v1/content/${
              item && item.video && item.video.VideoID
            }`}
            autoPlay
            muted
            loop
            className="w-full h-full bg-[#0f0f0f] pt-5 object-cover"
          ></video>
        ) : (
          <img
            src={`http://localhost:3000/api/v1/content/${
              item.cover_page && item.cover_page.CoverID
            }`}
            alt={item._id}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* filter */}
      <div className="filter_hide absolute top-0 w-[100%] h-full bg-gradient-to-r  from-[#0000006b]  to-transparent"></div>
      <div className="filter_hide absolute top-0 w-[100%] h-full bg-gradient-to-t  from-[#00000046] to-transparent"></div>

      {/* info block */}
      <div className="hide absolute bottom-0 left-0 p-12">
        {/* title */}
        <p className="text-[3rem] my-3 whitespace-nowrap">
          {" "}
          {item.title.length > 18
            ? `${item.title.substring(0, 18)}...`
            : item.title}
        </p>

        {/* options */}
        <div className="flex justify-between items-center mt-3 w-[8rem]">
          {/* play btn */}
          <span className="flex justify-between items-center text-[1.2rem]">
            <button>
              {" "}
              <BsPlayCircle
                style={shadowStyles}
                className="text-[4rem] cursor-pointer mr-3 duration-150 hover:bg-white hover:text-black rounded-[100%] p-1 bg-black "
              />
            </button>
            Play
          </span>

          {/* sub-options */}
          <p className="ml-24 flex justify-between items-center">
            {/* add to wishlist button */}

            {/* info link */}
            <button
              style={shadowStyles}
              className="mx-[5px] text-[2rem] duration-150 hover:bg-white hover:text-black rounded-[100%] p-1 bg-black "
            >
              <AiOutlineInfoCircle />
            </button>
          </p>
        </div>

        {/* details */}
        <p className="flex justify-between items-center text-[0.9rem] font-semibold my-2 w-[8rem]">
          <span className="flex justify-between items-center">
            <BsFillClockFill className="mr-[0.4rem]" />{" "}
            {item.video_length.hours}h {item.video_length.minutes}m
          </span>
          <span className="flex justify-between items-center">
            <BsFillCameraVideoFill className="mr-[0.4rem] ml-3" />{" "}
            {item.video_quality}
          </span>
        </p>
      </div>
    </Link>
  );
};
