import React from "react";
import { ImArrowRight } from "react-icons/im";
import "./Helpline.css";
import { HelplineData } from "./HelplineData";

const Helpline = () => {
  return (
    <div className="w-full flex flex-col justify-between items-center">
      <h3 className="mt-[5rem] m-[2.5rem] mb-7 w-auto border-b-2  text-[2rem] border-[#ffd500] text-white">
        Frequently Asked Questions (FAQ)
      </h3>
      {/* faq container */}
      <div className="w-full flex flex-col justify-start items-center mb-8">
        {/* single FAQ */}
        {HelplineData.map((item, index) => {
          return (
            <SingleFaq
              question={item.Question}
              answer={item.Answer}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Helpline;

export const SingleFaq = ({ question, answer }) => {
  const ShowInfo = (e) => {
    if (e.currentTarget.innerText === "+") {
      e.currentTarget.parentElement.parentElement.children[1].classList.remove(
        "hide_faq"
      );
      e.currentTarget.parentElement.parentElement.children[1].classList.add(
        "show_faq"
      );

      e.currentTarget.innerText = "-";
    } else {
      e.currentTarget.parentElement.parentElement.children[1].classList.remove(
        "show_faq"
      );
      e.currentTarget.parentElement.parentElement.children[1].classList.add(
        "hide_faq"
      );
      e.currentTarget.innerText = "+";
    }
  };

  return (
    <div className="w-[90%] lg:w-[70%]  flex flex-col justify-start items-center p-7 bg-zinc-200 text-black ">
      <div className="w-full flex justify-start text-[1.1rem] items-start">
        <p className="w-[5%] ">
          <ImArrowRight className="mt-[0.4rem]" />
        </p>
        <h1 className="w-[85%] font-bold ">{question}</h1>
        <p
          className="w-[2rem] h-[2rem] pb-2 rounded-full bg-zinc-800 text-white cursor-pointer text-[2rem] flex justify-center items-center"
          onClick={ShowInfo}
        >
          +
        </p>
      </div>

      <div className="hide_faq w-[89%] text-[0.9rem] py-[0.5rem]">
        <p className="text-[1rem] font-semibold underline">Solution</p>
        <p>{answer}</p>
      </div>

      <div className="border-b-2 border-zinc-600 w-[95%] mt-2"></div>
    </div>
  );
};
