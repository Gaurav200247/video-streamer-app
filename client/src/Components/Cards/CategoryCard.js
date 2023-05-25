import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const CategoryCard = ({ genre, image }) => {
  const styles = {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  };
  return image ? (
    <Link
      to={`/categories/${genre}`}
      className="cursor-pointer p-5 mr-5 w-full h-full flex justify-between items-start overflow-hidden rounded-2xl relative"
      style={styles}
    >
      <img
        src={image}
        alt={genre}
        className="absolute top-0 left-0 w-full h-full object-cover blur-[1.2px] brightness-[0.7]"
      />
      <h1 className="p-10 font-medium text-[1.2rem] lg:text-[1.7rem] z-10">
        {genre.charAt(0).toUpperCase() + genre.slice(1)}
      </h1>
    </Link>
  ) : (
    <Loader msg="Please wait..." />
  );
};

export default CategoryCard;
