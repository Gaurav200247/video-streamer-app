import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ThumbnailCard from "../Components/Cards/ThumbnailCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../Actions/VideosAction";
import Categories from "./Category/Categories";
import Loader from "../Components/Loader/Loader";

const VideoSearch = () => {
  const { txt } = useParams();

  const dispatch = useDispatch();

  const { loading, videos } = useSelector((state) => state.getAllVideos);

  console.log(videos);

  let currentPage = 1;

  useEffect(() => {
    dispatch(getAllVideos(txt, [], currentPage, false));
  }, [currentPage, txt, dispatch]);

  return loading ? (
    <Loader msg={`Searching for '${txt}'...`} />
  ) : (
    <div className=" w-full flex flex-col justify-between items-start">
      <h1 className="p-5 mt-10 text-[1.5rem]">
        Results for <span className="text-yellow-400">"{txt}"</span>
      </h1>

      {!videos ||
        !videos.videos ||
        (!videos.videos.length > 0 && (
          <div className=" p-5 text-center w-full">No Results Found !!</div>
        ))}

      {videos && videos.videos && videos.videos.length > 0 && videos.videos && (
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 p-5  lg:p-[2rem] pt-[1.5rem]">
          {videos &&
            videos.videos &&
            videos.videos.length > 0 &&
            videos.videos.map((item, index) => {
              return <ThumbnailCard key={index} data={item} />;
            })}
        </div>
      )}

      {/* line */}
      <div className="flex justify-center items-center w-full">
        <div className="p-[1px] my-5 bg-gray-300 w-[95%]"></div>
      </div>

      <div className="flex justify-center items-center w-full">
        <Categories isMargin={false} />
      </div>
    </div>
  );
};

export default VideoSearch;
