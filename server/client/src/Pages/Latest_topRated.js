import React, { useEffect, useState } from "react";
import ThumbnailCard from "../Components/Cards/ThumbnailCard";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../Actions/VideosAction";
import Loader from "../Components/Loader/Loader";
import { Link } from "react-router-dom";

export const Latest = () => {
  const dispatch = useDispatch();

  const { loading, videos } = useSelector((state) => state.getAllVideos);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllVideos("", [], currentPage, false));
  }, [dispatch, currentPage]);

  // console.log({ loading, errors, videos, currentPage });

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  return loading ? (
    <Loader msg="Loading Latest Videos..." />
  ) : (
    <div className="flex flex-col justify-between items-start w-full">
      <h1 className="mx-4 lg:mx-[2rem] mt-[4rem] mb-0 w-auto border-b-2 text-[1.2rem] lg:text-[1.5rem] text-[#ffd500]">
        New Videos
      </h1>
      {videos && videos.videos && videos.videos.length > 0 ? (
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:p-[2rem] pt-[1.5rem]">
          {videos &&
            videos.videos &&
            videos.videos.length > 0 &&
            videos.videos.map((item, index) => {
              return <ThumbnailCard key={index} data={item} />;
            })}
        </div>
      ) : (
        <div className="relative w-[100%] mt-5 p-[2rem] pr-[8rem] flex justify-end items-start bg-black">
          <div className="absolute top-0 left-[18rem] text-[3rem] mt-[5rem]">
            <h1>
              More Content <span className="text-sky-400">Coming Soon...</span>
            </h1>
            <h2 className="text-[2rem] text-green-400">
              For Now Check This Out
            </h2>
            <div className="flex justify-start items-center text-[1rem] my-2">
              <Link
                to="/categories"
                className="cursor-pointer text-yellow-400 hover:text-sky-400 duration-200 mr-5"
              >
                Categories
              </Link>
              <Link
                to="/most_viewed"
                className="cursor-pointer text-yellow-400 hover:text-sky-400 duration-200 mr-5"
              >
                Most Viewed
              </Link>

              <Link
                to="/helpline"
                className="cursor-pointer text-yellow-400 hover:text-sky-400 duration-200"
              >
                Help
              </Link>
            </div>
          </div>

          <img
            src="/contact.png"
            alt="coming soon..."
            className="w-[28rem] h-[25rem] rounded-md"
          />
        </div>
      )}

      {/* Pagination */}
      <div className="w-full my-[2rem]">
        {videos && videos.videos && videos.videos.length > 0 && (
          <Pagination
            activePage={currentPage} //1
            totalItemsCount={videos && videos.TotalnbHits} // all videos length
            itemsCountPerPage={(videos && videos.nbHits) || 12} // products in one page
            onChange={setCurrentPageNo}
            pageRangeDisplayed={3}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        )}
      </div>
    </div>
  );
};
// -----------------------------------------------------
export const MostViewed = () => {
  const dispatch = useDispatch();

  const { loading, videos } = useSelector((state) => state.getAllVideos);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllVideos("", [], currentPage, true));
  }, [dispatch, currentPage]);

  // console.log({ loading, errors, videos, currentPage });

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  return loading ? (
    <Loader msg="Loading Most Viewed Videos..." />
  ) : (
    <div className="flex flex-col justify-between items-start w-full ">
      <h1 className="mx-4 lg:mx-[2rem] mt-[4rem] mb-0 w-auto border-b-2  text-[1.5rem] text-[#ffd500]">
        Most Viewed Videos
      </h1>
      {videos && videos.videos && videos.videos.length > 0 ? (
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:p-[2rem] pt-[1.5rem]">
          {videos &&
            videos.videos &&
            videos.videos.length > 0 &&
            videos.videos.map((item, index) => {
              return <ThumbnailCard key={index} data={item} />;
            })}
        </div>
      ) : (
        <div className="relative w-[100%] mt-5 p-[2rem] pr-[8rem] flex justify-end items-start bg-black">
          <div className="absolute top-0 left-[18rem] text-[3rem] mt-[5rem]">
            <h1>
              More Content <span className="text-sky-400">Coming Soon...</span>
            </h1>
            <h2 className="text-[2rem] text-green-400">
              For Now Check This Out
            </h2>
            <div className="flex justify-start items-center text-[1rem] my-2">
              <Link
                to="/categories"
                className="cursor-pointer text-yellow-400 hover:text-sky-400 duration-200 mr-5"
              >
                Categories
              </Link>

              <Link
                to="/latest"
                className="cursor-pointer text-yellow-400 hover:text-sky-400 duration-200 mr-5"
              >
                New Videos
              </Link>
              <Link
                to="/helpline"
                className="cursor-pointer text-yellow-400 hover:text-sky-400 duration-200"
              >
                Help
              </Link>
            </div>
          </div>

          <img
            src="/contact.png"
            alt="coming soon..."
            className="w-[28rem] h-[25rem] rounded-md"
          />
        </div>
      )}

      {/* Pagination */}
      <div className="w-full my-[2rem]">
        {videos && videos.videos && videos.videos.length > 0 && (
          <Pagination
            activePage={currentPage} //1
            totalItemsCount={videos && videos.TotalnbHits} // all videos length
            itemsCountPerPage={(videos && videos.nbHits) || 12} // products in one page
            onChange={setCurrentPageNo}
            pageRangeDisplayed={3}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        )}
      </div>
    </div>
  );
};
