import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, RegisterUser } from "../../Actions/UserAction";
import { AiOutlineCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

const SignUp = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const AvatarInputRef = useRef(null);

  const { isAuthenticated, error, loading, user } = useSelector(
    (state) => state.user
  );

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  const [Page, setPage] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
      toast.success(`Welcome ${user && user.user && user.user.user_name}`);
    }
    if (error !== "Please login to access this Route...") {
      toast.error(error);
      dispatch(ClearErrors());
    }
  }, [isAuthenticated, navigate, redirect, dispatch, error, user]);

  const styles = {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
  };

  return loading ? (
    <Loader msg="Resgistering!! Please wait..." />
  ) : (
    <div className="w-full flex flex-col justify-center items-center h-screen p-8">
      <div className="flex justify-center items-center w-full text-[2rem] font-semibold">
        Video Streamer
      </div>

      <Formik
        className="w-full h-[90%] flex justify-center items-center"
        initialValues={{
          name: "",
          email: "",
          password: "",
          avatar: "",
          avatarPreview: "",
        }}
        onSubmit={(values) => {
          const myform = new FormData();

          myform.set("name", values.name);
          myform.set("email", values.email);
          myform.set("password", values.password);
          myform.set("avatar", values.avatar);

          // if (!values.avatar) toast.error("Please Choose an Avatar !!");

          dispatch(RegisterUser(myform));

          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form
            style={styles}
            className="lg:w-[32%] w-[85%] h-[70%] flex flex-col justify-between items-start p-5 mt-[2rem] rounded-2xl  bg-zinc-800"
          >
            {/* Heading */}
            <h1 className="text-[1.2rem] font-semibold">
              {Page === 1 ? "Create an Account" : "Choose an Avatar"}
            </h1>

            {/* Page 1 */}
            {Page === 1 && (
              <>
                <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
                  <label className="text-[0.9rem]">Name</label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="What Should we call you ?"
                    className="w-full p-2 text-[0.9rem] rounded-md bg-zinc-600"
                  />
                </div>
                <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
                  <label className="text-[0.9rem]">Email</label>
                  <Field
                    name="email"
                    type="text"
                    placeholder="name@company.com"
                    className="w-full p-2 text-[0.9rem] rounded-md bg-zinc-600"
                  />
                </div>
                <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
                  <label className="text-[0.9rem]">Password</label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter Password Here..."
                    className="w-full p-2 text-[0.9rem] rounded-md bg-zinc-600"
                  />
                </div>{" "}
              </>
            )}

            {/* Page 2 */}
            {Page === 2 && (
              <div className="flex flex-wrap justify-center items-center w-full">
                <div className="my-12 p-2 bg-white rounded-full w-[9rem] h-[9rem] relative">
                  <img
                    src={values.avatarPreview || "/user.png"}
                    alt="user"
                    className=" w-full h-full object-cover shadow-sm  rounded-full"
                  />
                  <AiOutlineCamera
                    className="absolute bottom-2 right-2 bg-slate-700 text-white text-[2.5rem] rounded-full p-2 cursor-pointer border-2 border-white"
                    onClick={() => {
                      AvatarInputRef.current.click();
                    }}
                  />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    ref={AvatarInputRef}
                    onChange={(event) => {
                      console.log("changed");

                      const reader = new FileReader();

                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setFieldValue("avatarPreview", reader.result);
                        }
                      };
                      reader.readAsDataURL(event.target.files[0]);
                      setFieldValue("avatar", event.target.files[0]);
                    }}
                  />
                </div>
                {/* <div
                  className={`flex justify-center items-center overflow-hidden rounded-full cursor-pointer border-[3px] shadow-lg m-3 hover:border-yellow-400 ${
                    values.avatar === "/avatars/1.png"
                      ? "border-yellow-400"
                      : "border-white"
                  }`}
                  onClick={() => setFieldValue("avatar", "/avatars/1.png")}
                >
                  <Avatars source="/avatars/1.png" background="bg-green-800" />
                </div>

                <div
                  className={`flex justify-center items-center overflow-hidden rounded-full cursor-pointer border-[3px] shadow-lg m-3 hover:border-yellow-400 ${
                    values.avatar === "/avatars/2.png"
                      ? "border-yellow-400"
                      : "border-white"
                  }`}
                  onClick={() => setFieldValue("avatar", "/avatars/2.png")}
                >
                  <Avatars source="/avatars/2.png" background="bg-red-800" />
                </div>

                <div
                  className={`flex justify-center items-center overflow-hidden rounded-full cursor-pointer border-[3px] shadow-lg m-3 hover:border-yellow-400 ${
                    values.avatar === "/avatars/3.png"
                      ? "border-yellow-400"
                      : "border-white"
                  }`}
                  onClick={() => setFieldValue("avatar", "/avatars/3.png")}
                >
                  <Avatars source="/avatars/3.png" background="bg-sky-800" />
                </div>

                <div
                  className={`flex justify-center items-center overflow-hidden rounded-full cursor-pointer border-[3px] shadow-lg m-3 hover:border-yellow-400 ${
                    values.avatar === "/avatars/4.png"
                      ? " border-yellow-400"
                      : "border-white"
                  }`}
                  onClick={() => setFieldValue("avatar", "/avatars/4.png")}
                >
                  <Avatars source="/avatars/4.png" background="bg-pink-800" />
                </div>

                <div
                  className={`flex justify-center items-center overflow-hidden rounded-full cursor-pointer border-[3px] shadow-lg m-3 hover:border-yellow-400 ${
                    values.avatar === "/avatars/5.png"
                      ? "0 border-yellow-400"
                      : "border-white"
                  }`}
                  onClick={() => setFieldValue("avatar", "/avatars/5.png")}
                >
                  <Avatars source="/avatars/5.png" background="bg-slate-800" />
                </div>

                <div
                  className={`flex justify-center items-center overflow-hidden rounded-full cursor-pointer border-[3px] shadow-lg m-3 hover:border-yellow-400 ${
                    values.avatar === "/avatars/6.png"
                      ? "00 border-yellow-400"
                      : "border-white"
                  }`}
                  onClick={() => setFieldValue("avatar", "/avatars/6.png")}
                >
                  <Avatars source="/avatars/6.png" background="bg-purple-800" />
                </div> */}
              </div>
            )}

            {/* Buttons  */}
            <div className="w-full flex justify-center items-center my-[0.7rem]">
              {/* Next Step btn */}
              {Page === 1 && (
                <span
                  onClick={() => setPage(2)}
                  className="w-[95%] text-center cursor-pointer bg-orange-500 text-black py-2 rounded-md hover:bg-orange-400"
                >
                  Next Step
                </span>
              )}

              {/* create account btn */}
              {Page === 2 && (
                <button
                  type="submit"
                  // disabled={values.avatar ? false : true}
                  className="w-[95%] bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-400"
                >
                  Create an account
                </button>
              )}
            </div>

            {/* login link */}
            {Page === 1 && (
              <p className="flex justify-center items-center w-full">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="ml-1 text-yellow-400 hover:underline"
                >
                  Login here
                </Link>
              </p>
            )}

            {/* go back link */}
            {Page === 2 && (
              <span
                onClick={() => setPage(1)}
                className="flex justify-center items-center cursor-pointer  text-yellow-400 hover:underline w-full "
              >
                Go Back !!
              </span>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;

export const Avatars = ({ source, background }) => {
  return (
    <img
      src={source}
      alt={source}
      className={`lg:h-[6rem] lg:w-[6rem] h-[5rem] w-[5rem] p-2 ${background} object-cover`}
    />
  );
};
