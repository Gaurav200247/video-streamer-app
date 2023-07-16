import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ThumbnailCard from "../../Components/Cards/ThumbnailCard";
import { getAllVideos } from "../../Actions/VideosAction";
import Loader from "../../Components/Loader/Loader";
import Categories from "./Categories";

const SingleCategory = () => {
  let { genre } = useParams();

  const dispatch = useDispatch();

  const { loading, videos } = useSelector((state) => state.getAllVideos);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllVideos("", [genre], currentPage, false));
  }, [dispatch, currentPage, genre]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  return loading ? (
    <Loader msg="" />
  ) : (
    <div className="flex flex-col justify-between items-start">
      <h3 className="m-4 lg:m-[2.5rem] mt-[4rem] mb-0 w-auto border-b-2  text-[1.5rem] lg:text-[2rem] border-[#ffd500] ">
        {genre.charAt(0).toUpperCase() + genre.slice(1)}{" "}
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 lg:p-[2rem] pt-[1.5rem] ">
        {videos &&
          videos.videos &&
          videos.videos.length > 0 &&
          videos.videos.map((item, index) => {
            return <ThumbnailCard key={index} data={item} />;
          })}
      </div>

      {!videos ||
        !videos.videos ||
        (!videos.videos.length > 0 && (
          <div className="my-10 p-5 text-center text-[2rem] w-full">
            No Results Found !!
          </div>
        ))}

      {/* Pagination */}
      <div className="w-full my-[2rem]">
        {videos && videos.videos && videos.videos.length > 0 && (
          <Pagination
            activePage={currentPage} //1
            totalItemsCount={videos && videos.TotalnbHits} // all videos length
            itemsCountPerPage={(videos && videos.nbHits) || 12} // products in one page
            onChange={setCurrentPageNo}
            pageRangeDisplayed={2}
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

      {/* line */}
      <div className="flex justify-center items-center w-full">
        <div className="p-[1px] my-5 bg-gray-300 w-[95%]"></div>
      </div>

      <Categories isMargin={false} />
    </div>
  );
};

export default SingleCategory;
