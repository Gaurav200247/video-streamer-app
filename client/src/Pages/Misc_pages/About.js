import React from "react";

const About = () => {
  return (
    <div className="h-[85vh] lg:h-screen w-full flex justify-start items-center relative bg-[#1f4e60]">
      <img
        src="/about_wall.jpg"
        alt="about us"
        className="absolute top-0 left-0 w-full h-full object-contain"
      />
      <p className="lg:text-[2rem] text-[1.2rem] w-full z-20 p-5 lg:ml-64 ml-14 mt-10 lg:mt-0">
        <span className="lg:text-[3rem] text-[1.5rem] font-semibold">
          Not Much
        </span>
        <br /> to tell about me...
      </p>
    </div>
  );
};

export default About;
