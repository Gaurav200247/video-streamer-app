import React, { useEffect } from "react";
import CarouselSlider from "../Components/Sliders/CarouselSlider";
import { Slider1, Slider2 } from "../Components/Sliders/Sliders";
import { useSelector, useDispatch } from "react-redux";
import { getAllVideos } from "../Actions/VideosAction";
import Loader from "../Components/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.getAllVideos);

  useEffect(() => {
    dispatch(getAllVideos("", [], 1, false, true));
  }, [dispatch]);

  // console.log({ videos });

  let featuredVideos =
    videos &&
    videos.videos &&
    videos.videos.length > 0 &&
    videos.videos.filter((item) => item.featured === true);

  let AnimeVideos =
    videos &&
    videos.videos &&
    videos.videos.length > 0 &&
    videos.videos.filter(
      (item) => item.speciality_In.includes("Anime") === true
    );

  let SportsVideos =
    videos &&
    videos.videos &&
    videos.videos.length > 0 &&
    videos.videos.filter(
      (item) => item.speciality_In.includes("Sports") === true
    );

  let ActionVideos =
    videos &&
    videos.videos &&
    videos.videos.length > 0 &&
    videos.videos.filter(
      (item) => item.speciality_In.includes("Action") === true
    );

  let DocumentaryVideos =
    videos &&
    videos.videos &&
    videos.videos.length > 0 &&
    videos.videos.filter(
      (item) => item.speciality_In.includes("Wildlife") === true
    );

  return (
    <div className="flex flex-col justify-between items-center w-full">
      {loading ? (
        <Loader msg="Loading..." />
      ) : (
        <CarouselSlider FeaturedData={featuredVideos} />
      )}

      <Slider1 Heading="Spotlights" data={featuredVideos} />
      {/* <Slider2 Heading="Action" data={ActionVideos} /> */}
      <Slider2 Heading="Sports Mixtapes" data={SportsVideos} />

      <Slider1 Heading="Anime Action" data={AnimeVideos} />

      <Slider2 Heading="Non-Stop Action" data={ActionVideos} />

      <Slider1 Heading="Wildlife" data={DocumentaryVideos} />
    </div>
  );
};

export default Home;
