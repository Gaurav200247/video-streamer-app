import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClearErrors, resetPassword } from "../../Actions/UserAction";

const ResetPassword = () => {
  const styles = {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
  };

  const { error, success } = useSelector((state) => state.forgotResetPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetToken } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }
    if (success) {
      toast.success("Password Updated Successfully");

      navigate("/login");
    }
  }, [error, dispatch, success, navigate]);

  // console.log({ resetToken });

  const formik = useFormik({
    initialValues: {
      newPass: "",
      confirmPass: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log({ values });
      dispatch(resetPassword(resetToken, values.newPass, values.confirmPass));
    },
  });

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen p-8">
      <div className="flex justify-center items-end w-full text-[2rem] font-semibold h-[20%]">
        <img src="/happy.png" alt="sad" className="h-[5rem] w-[5rem] mr-2" />
        Reset Password
      </div>

      <div className="w-full h-[80%] flex justify-center items-start ">
        <form
          onSubmit={formik.handleSubmit}
          style={styles}
          className="lg:w-[32%] w-[85%] h-[75%] flex flex-col justify-between items-start p-5 mt-[2rem]  rounded-2xl  bg-zinc-800"
        >
          <h1 className="text-[0.9rem] text-center w-full">
            Good Work !! <br />
            Now Create a Strong a Password
          </h1>

          <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
            <label className="text-[0.9rem] mb-1">New Password</label>
            <input
              {...formik.getFieldProps("newPass")}
              type="password"
              placeholder="Enter Password Here..."
              className="w-full p-2 text-[1rem] rounded-md bg-zinc-600"
            />
          </div>
          <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
            <label className="text-[0.9rem] mb-1">Confirm Password</label>
            <input
              {...formik.getFieldProps("confirmPass")}
              type="password"
              placeholder="Enter Password Here..."
              className="w-full p-2 text-[1rem] rounded-md bg-zinc-600"
            />
          </div>

          <div className="w-full flex justify-center items-center ">
            <button className="w-[95%] mt-[1rem] bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-400">
              Reset Password{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
