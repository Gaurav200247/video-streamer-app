import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  BsFillClockFill,
  BsFillCameraVideoFill,
  BsPlayCircle,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CarouselSlider = ({ FeaturedData }) => {
  const { wishlistResponse } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (
      wishlistResponse &&
      wishlistResponse.msg === "video added to wishlist"
    ) {
      toast.success(wishlistResponse.msg);
    }
    if (
      wishlistResponse &&
      wishlistResponse.msg === "video removed from wishlist"
    ) {
      toast.warning(wishlistResponse.msg);
    }
  }, [wishlistResponse]);

  return (
    <div className="w-[95%] pt-[5rem] lg:pt-[3rem] relative z-[0]">
      <Carousel
        showArrows={true}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        useKeyboardArrows={true}
        swipeable={true}
        dynamicHeight={true}
        emulateTouch={true}
        showIndicators={false}
      >
        {FeaturedData &&
          FeaturedData.map((item, index) => {
            return <CarouselSliderCard key={index} item={item} />;
          })}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;

export const CarouselSliderCard = ({ item }) => {
  // const dispatch = useDispatch();
  // const { isAuthenticated, user } = useSelector((state) => state.user);
  // const { wishlistResponse } = useSelector((state) => state.wishlist);
  // const navigate = useNavigate();

  // const AddToWishlistHandler = (VideoID) => {
  //   if (isAuthenticated) {
  //     const myForm = new FormData();
  //     myForm.set("videoID", VideoID);

  //     dispatch(addToWishlist(myForm));
  //   } else {
  //     toast.warning("Please login to access this feature...");
  //     navigate("/login");
  //   }
  // };

  const shadowStyles = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  };

  // const [isInWIshlist, setisInWIshlist] = useState(
  //   user &&
  //     user.user &&
  //     user.user.wishList &&
  //     user.user.wishList.length > 0 &&
  //     user.user.wishList.includes(item._id)
  // );

  // useEffect(() => {
  //   if (wishlistResponse && wishlistResponse.success) {
  //     setisInWIshlist(true);
  //   }
  // }, [isInWIshlist, wishlistResponse]);

  // console.log({ wishlistResponse });

  return (
    <div className="text-white">
      {/* image */}
      <img
        src={`http://localhost:3000/api/v1/content/${
          item.cover_page && item.cover_page.CoverID
        }`}
        alt={item._id}
        className="w-full h-[30vh] sm:h-[40vh] lg:h-[70vh] rounded-lg overflow-hidden object-cover brightness-[1.2]"
      />

      {/* filter */}
      <div className="absolute top-0 w-[100%] h-full bg-gradient-to-r  from-[#000000e6]   via-[#0000004d]  dark:to-transparent"></div>
      <div className="absolute top-0 w-[100%] h-full bg-gradient-to-t  dark:from-[#00000089] from-[#00000056] dark:to-transparent"></div>

      {/* LEGEND */}
      <div className="absolute z-30 top-0 w-[55%] h-full flex flex-col justify-end items-start p-2 lg:p-14">
        {/* INFO BLOCK */}
        <div className="w-full flex flex-col justify-between items-start p-8 ">
          {/* title */}
          <p className="text-[2rem] lg:text-[3rem] my-3 whitespace-nowrap">
            {item.title.length > 20
              ? `${item.title.substring(0, 20)}...`
              : item.title}
          </p>

          {/* details */}
          <p className="flex justify-between items-center text-[0.8rem] lg:text-[0.9rem] font-semibold my-2">
            <span className="flex justify-between items-center">
              <BsFillClockFill className="mr-[0.4rem]" />{" "}
              {item.video_length.hours}h {item.video_length.minutes}m
            </span>
            <span className="flex justify-between items-center">
              <BsFillCameraVideoFill className="mr-[0.4rem] ml-3" />{" "}
              {item.video_quality}
            </span>
          </p>

          <p className="h-0 lg:h-auto overflow-hidden text-[0.8rem] my-2 text-left">
            {item.synopsis}
          </p>

          {/* options */}
          <div className="flex justify-between items-center lg:mt-3">
            {/* play btn */}
            <span className="flex justify-between items-center text-[1rem]  lg:text-[1.2rem]">
              <Link to={`/videos/${item._id}`}>
                {" "}
                <BsPlayCircle
                  style={shadowStyles}
                  className="text-[3rem] lg:text-[4rem] cursor-pointer mr-3 duration-150 hover:bg-white hover:text-black rounded-[100%] p-1 bg-black "
                />
              </Link>
              Play
            </span>

            {/* sub-options */}
            <p className="ml-10 lg:ml-24 flex justify-between items-center">
              {/* add to wishlist button */}
              <button
                to="/login"
                style={shadowStyles}
                className="mx-[5px] text-[1.2rem] lg:text-[2rem] duration-150 hover:bg-white hover:text-black rounded-[100%] p-1 bg-black "
                // onClick={() => AddToWishlistHandler(item._id)}
              >
                {/* {isInWIshlist ? <MdBookmarkAdded /> : <BsPlusCircle />} */}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
