import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearErrors,
  loadUser,
  updateProfilePassword,
} from "../../Actions/UserAction";
import UserSideBar from "../../Components/User/UserSideBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfilePasswordUpdate = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.updateProfile);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated Successfully");
      dispatch({ type: "updatePasswordReset" });
      dispatch(loadUser());

      naviagte("/account");
    }
  }, [error, dispatch, isUpdated, naviagte]);

  const formik = useFormik({
    initialValues: {
      oldPass: "",
      newPass: "",
      confirmPass: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(
        updateProfilePassword(
          values.oldPass,
          values.newPass,
          values.confirmPass
        )
      );
    },
  });

  return (
    <div className="flex justify-between items-center w-full lg:h-[120vh]">
      <div className="w-0 overflow-hidden lg:w-[20%] h-full">
        <UserSideBar />
      </div>
      <div className="w-full lg:w-[80%] h-full bg-slate-500  text-black lg:p-16 py-16 px-5  flex flex-col justify-start items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="lg:w-[50%] w-[100%] bg-gray-200 p-5 px-8 rounded-md mt-10 flex flex-col justify-between items-center "
        >
          <h1
            className="w-full text-center text-[1.3rem] font-semibold underline
          "
          >
            Keep Your Passwords Up-to-date
          </h1>

          <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
            <label className="text-[0.9rem] my-2 font-semibold">
              Old Password
            </label>
            <input
              {...formik.getFieldProps("oldPass")}
              type="password"
              placeholder="Enter Old Password"
              className=" w-full p-2 text-[1rem] rounded-md bg-gray-600"
            />
          </div>
          <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
            <label className="text-[0.9rem] my-2 font-semibold">
              New Password
            </label>
            <input
              {...formik.getFieldProps("newPass")}
              type="password"
              placeholder="Enter New Password"
              className=" w-full p-2 text-[1rem] rounded-md bg-gray-600"
            />
          </div>
          <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
            <label className="text-[0.9rem] my-2 font-semibold">
              Confirm Password
            </label>
            <input
              {...formik.getFieldProps("confirmPass")}
              type="password"
              placeholder="Re-Enter New Password"
              className=" w-full p-2 text-[1rem] rounded-md bg-gray-600"
            />
          </div>

          <div className="w-full flex justify-center items-center ">
            <button
              type="submit"
              className="w-[95%] bg-sky-500 text-black py-2 rounded-md hover:bg-sky-400 my-5"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePasswordUpdate;
