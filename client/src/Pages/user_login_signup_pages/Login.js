import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../Actions/UserAction";
import { ClearErrors } from "../../Actions/UserAction";

const Login = () => {
  const styles = {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, error } = useSelector((state) => state.user);

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
      toast.success(`Welcome ${user && user.user && user.user.user_name}`);
    }

    if (error !== "Please login to access this Route...") {
      toast.error(error);
      dispatch(ClearErrors());
    }
  }, [isAuthenticated, navigate, error, dispatch, redirect, user]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(loginUser(values.email, values.password));
    },
  });

  return (
    <div className="w-full flex flex-col justify-start lg:justify-center items-center h-screen lg:p-14 py-14 px-8">
      <div className="flex justify-center items-center w-full text-[2rem] font-semibold">
        Video Streamer
      </div>

      <div className="w-full h-[70%] flex justify-center items-center">
        <form
          style={styles}
          onSubmit={formik.handleSubmit}
          className="lg:w-[32%] w-[100%] h-full flex flex-col justify-between items-start p-5 mt-[2rem]  rounded-2xl  bg-zinc-800"
        >
          <h1 className="text-[1.2rem] font-semibold">
            Sign In to your Account
          </h1>

          <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
            <label className="text-[0.9rem] lg:m-0 mb-1">Email</label>
            <input
              {...formik.getFieldProps("email")}
              name="email"
              type="text"
              placeholder="name@company.com"
              className="w-full p-2 text-[1rem] rounded-md bg-zinc-600"
            />
          </div>

          <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
            <label className="text-[0.9rem] lg:m-0 mb-1">Password</label>
            <input
              {...formik.getFieldProps("password")}
              name="password"
              type="password"
              placeholder="Enter Password Here..."
              className="w-full p-2 text-[1rem] rounded-md bg-zinc-600"
            />
          </div>

          <p className="w-full text-right underline hover:decoration-transparent text-[#ffd500]">
            <Link to="/password/forgot">Forgot Password ?</Link>
          </p>

          <div className="w-full flex justify-center items-center ">
            <button
              type="submit"
              className="w-[95%] bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-400"
            >
              Sign In
            </button>
          </div>

          <p className="flex justify-center items-center w-full">
            Don't have an account yet?{" "}
            <Link to="/signUp" className="ml-1 text-yellow-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
