import React, { useEffect, useRef } from "react";
import UserSideBar from "../../Components/User/UserSideBar";
import { AiOutlineCamera } from "react-icons/ai";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearErrors,
  loadUser,
  updateProfileDetails,
} from "../../Actions/UserAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { user } = useSelector((state) => state.user);

  const UploadInput = useRef(null);

  const { error, isUpdated, loading } = useSelector(
    (state) => state.updateProfile
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch({ type: "updateProfileReset" });

      dispatch(loadUser());

      naviagte("/account");
    }
  }, [error, dispatch, isUpdated, naviagte]);

  return (
    <div className="flex justify-between items-center w-full lg:h-[120vh]">
      <div className="w-0 overflow-hidden lg:w-[20%] h-full">
        <UserSideBar />
      </div>

      {/*  */}
      {loading ? (
        <Loader msg="Updating Profile Details..." />
      ) : (
        <div className="w-full lg:w-[80%] h-full bg-slate-500  text-black lg:p-16 py-16 px-5 flex flex-col justify-start items-center">
          <Formik
            initialValues={{
              email: user && user.user && user.user.email,
              user_name: user && user.user && user.user.user_name,
              avatar: "",
              avatarPreview:
                user && user.user && user.user.avatar && user.user.avatar.url,
            }}
            onSubmit={(values) => {
              console.log({ values });

              const myForm = new FormData();

              myForm.set("email", values.email);
              myForm.set("user_name", values.user_name);

              myForm.set("avatar", values.avatar);

              dispatch(updateProfileDetails(myForm));
              // console.log({ values });
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="lg:w-[50%] w-[100%] bg-gray-200 p-5 px-8 rounded-md mt-10 flex flex-col justify-between items-center ">
                <h1
                  className="w-full text-center text-[1.3rem] font-semibold underline
          "
                >
                  Keep Your Profile Up-to-date
                </h1>

                {/* avatar */}
                <div className="w-full flex flex-col justify-between items-center my-[0.7rem]">
                  <label className="text-[0.9rem] my-2 font-semibold">
                    Update Avatar
                  </label>

                  {values.avatarPreview && (
                    <div className="p-1 bg-slate-400 rounded-full w-[9rem] h-[9rem] relative">
                      <img
                        src={values.avatarPreview || values.avatar}
                        alt={
                          user &&
                          user.user &&
                          user.user.avatar &&
                          user.user.avatar.public_id
                        }
                        className=" w-full h-full rounded-full object-cover shadow-sm"
                      />
                      <AiOutlineCamera
                        className="absolute bottom-2 right-2 bg-slate-700 text-white text-[2.5rem] rounded-full p-2 cursor-pointer border-2 border-white"
                        onClick={() => {
                          UploadInput.current.click();
                        }}
                      />
                      <input
                        type="file"
                        hidden
                        ref={UploadInput}
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
                  )}
                </div>

                {/* name */}
                <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
                  <label className="text-[0.9rem] my-2 font-semibold">
                    Update Name
                  </label>
                  <Field
                    name="user_name"
                    type="text"
                    placeholder="Enter Name Here..."
                    className=" w-full p-2 text-[1rem] rounded-md bg-gray-600 text-white"
                  />
                </div>

                {/* email */}
                <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
                  <label className="text-[0.9rem] my-2 font-semibold">
                    Update Email
                  </label>
                  <Field
                    name="email"
                    type="text"
                    placeholder="name@company.com"
                    className=" w-full p-2 text-[1rem] rounded-md bg-gray-600 text-white"
                  />
                </div>

                <div className="w-full flex justify-center items-center ">
                  <button
                    type="submit"
                    className="w-[95%] bg-teal-500 text-black py-2 rounded-md hover:bg-teal-400 my-5"
                  >
                    Update Profile
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
