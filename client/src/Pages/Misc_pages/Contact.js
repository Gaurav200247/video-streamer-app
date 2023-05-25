import React, { useEffect } from "react";

import { useForm, ValidationError } from "@formspree/react";
import { toast } from "react-toastify";

const Contact = () => {
  const [state, handleSubmit] = useForm("mpzebygq");

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Thanks you, we'll get in touch ASAP.");
    }
  }, [state, toast]);

  return (
    <div className="flex flex-col justify-center items-center w-full bg-gradient-to-tr from-purple-800 via-green-700 to-blue-500 p-5">
      <h1 className="text-[2rem] lg:mt-10 mt-14 font-bold">Contact Us</h1>

      <p className="text-[0.9rem] mt-3 text-center">
        let's get this conversation started. Tell us about yourself and we'll
        get in touch ASAP.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-[rgb(33,33,33)] text-white lg:w-[50%] w-full rounded-md p-5 px-8 lg:my-6 my-10 "
      >
        {/* name */}
        {/* <div className="flex flex-col justify-between items-start">
          <label className="mt-4 text-[.9rem]">Name</label>
          <input
            type="text"
            placeholder="What should we call you?"
            className="w-full rounded-md outline-none p-2 text-black"
          />
        </div> */}

        <div className="flex flex-col justify-between items-start">
          <label className="mt-4 text-[.9rem]">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="abc@gmail.com"
            className="w-full rounded-md outline-none p-2 text-black"
          />
        </div>
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        {/* Subject */}
        {/* <div className="flex flex-col justify-between items-start">
          <label className="mt-4 text-[.9rem]">Subject</label>
          <textarea
            cols="30"
            rows="1"
            placeholder="Enter Subject Here..."
            className="w-full rounded-md outline-none p-2 text-black"
          ></textarea>
        </div> */}

        <div className="flex flex-col justify-between items-start">
          <label className="mt-4 text-[.9rem]">Message</label>
          <textarea
            id="message"
            name="message"
            cols="30"
            rows="5"
            placeholder="Enter Message Here..."
            className="w-full rounded-md outline-none p-2 text-black"
          ></textarea>
        </div>

        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />

        <div className="flex justify-center items-center w-full my-4">
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
