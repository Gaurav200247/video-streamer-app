import React from "react";
import CategoryCard from "../../Components/Cards/CategoryCard";

const Categories = ({ isMargin }) => {
  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex justify-start items-center w-full">
        <h3
          className={`${
            isMargin && "mt-[4rem]"
          } m-[2.5rem] mb-0 border-b-2  text-[1.5rem] text-left  border-[#ffd500] `}
        >
          Top Genres
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5  lg:p-[2rem] pt-[1.5rem] ">
        <CategoryCard genre="Action" image="/Categories/action.jpg" />{" "}
        <CategoryCard genre="Fight" image="/Categories/adventure.jpg" />{" "}
        {/* <CategoryCard genre="cartoons" image="/Categories/cartoons.jpg" />{" "} */}
        <CategoryCard genre="Anime" image="/Categories/anime.jpg" />{" "}
        <CategoryCard genre="comedy" image="/Categories/comedy.jpg" />{" "}
        {/* <CategoryCard genre="documentary" image="/Categories/documentary.jpg" /> */}
        {/* <CategoryCard genre="drama" image="/Categories/drama.jpg" /> */}
        {/* <CategoryCard genre="horror" image="/Categories/horror.jpg" /> */}
        {/* <CategoryCard genre="thriller" image="/Categories/thriller.jpg" /> */}
        <CategoryCard genre="Sports" image="/Categories/sports.jpg" />
      </div>
    </div>
  );
};

export default Categories;
