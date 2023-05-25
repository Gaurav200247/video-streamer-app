import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClearErrors, forgotPassword } from "../../Actions/UserAction";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.forgotResetPassword);

  // console.log({ message });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [error, dispatch, message]);

  const styles = {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log({ values });
      dispatch(forgotPassword(values.email));
    },
  });

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen p-8">
      <div className="flex justify-center items-end w-full text-[2rem] font-semibold h-[20%]">
        <img src="/sad.png" alt="sad" className="h-[3rem] w-[3rem] mr-2" />
        Forgot Password ?
      </div>

      <div className="w-full h-[80%] flex justify-center items-start ">
        <form
          onSubmit={formik.handleSubmit}
          style={styles}
          className="lg:w-[32%] w-[85%] h-[65%] flex flex-col justify-between items-start p-5 mt-[2rem]  rounded-2xl  bg-zinc-800"
        >
          <h1 className="text-[0.9rem] text-center">
            We get it, stuff happens. Just enter your email address below and
            we'll send you a link to reset your password!
          </h1>

          <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
            <label className="text-[0.9rem] mb-1">Email</label>
            <input
              {...formik.getFieldProps("email")}
              type="text"
              placeholder="name@company.com"
              className="w-full p-2 text-[1rem] rounded-md bg-zinc-600"
            />
          </div>

          <div className="w-full flex justify-center items-center ">
            <button
              type="submit"
              className="w-[95%] bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-400"
            >
              Reset Password{" "}
            </button>
          </div>

          <p className="flex justify-center items-center w-full">
            Remember your Password?{" "}
            <Link to="/login" className="ml-1 text-yellow-400 hover:underline">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
