import React from "react";
import CategoryCard from "../../Components/Cards/CategoryCard";

const Categories = ({ isMargin }) => {
  return (
    <div className="flex flex-col justify-between items-center w-full">
      <div className="flex justify-start items-center w-full">
        <h3
          className={`${
            isMargin && "mt-[4rem]"
          } m-[2.5rem] mb-0 border-b-2  text-[1.5rem] text-left  border-[#ffd500] `}
        >
          Top Genres
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5  lg:p-[2rem] pt-[1.5rem] w-full">
        <CategoryCard genre="Action" image="/Categories/action.jpg" />{" "}
        <CategoryCard genre="Anime" image="/Categories/anime.jpg" />{" "}
        <CategoryCard genre="Wildlife" image="/Categories/wildlife.jpg" />
        <CategoryCard genre="Sports" image="/Categories/sports.jpg" />
      </div>
    </div>
  );
};

export default Categories;
