import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ClearErrors,
  getSingleUserDetails,
  updateUsers,
} from "../../Actions/UserAction";
import { Field, Form, Formik } from "formik";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.getSingleUserDetails);
  const { loading, isUpdated, updateError } = useSelector(
    (state) => state.deleteUpdateUser
  );

  useEffect(() => {
    dispatch(getSingleUserDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      dispatch(ClearErrors());
    }
    if (isUpdated) {
      toast.success("User Updated Successfully");
      dispatch({ type: "UpdateUserReset" });
      navigate("/admin/dashboard");
    }
  }, [updateError, dispatch, isUpdated, navigate]);

  // console.log(user && user.user && user.user.email);

  return loading ? (
    <Loader msg="Getting User Info, Please Wait..." />
  ) : (
    <div className="w-full h-full bg-slate-500  text-black lg:p-16 py-20 px-5 flex flex-col justify-start items-center">
      {user && user.success && (
        <Formik
          initialValues={{
            email: user && user.user && user.user.email,
            user_name: user && user.user && user.user.user_name,
            role: user && user.user && user.user.role,
            avatar:
              user && user.user && user.user.avatar && user.user.avatar.url,
            public_id:
              user &&
              user.user &&
              user.user.avatar &&
              user.user.avatar.public_id,
          }}
          onSubmit={(values) => {
            console.log({ values });

            const myForm = new FormData();

            myForm.set("email", values.email);
            myForm.set("name", values.user_name);
            myForm.set("role", values.role);

            dispatch(updateUsers(myForm, user && user.user && user.user._id));
            // console.log({ values });
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="lg:w-[50%] w-[100%] bg-gray-200 p-5 px-8 rounded-md mt-10 flex flex-col justify-between items-center ">
              {/* avatar */}
              {values.avatar && (
                <div className="w-full flex flex-col justify-between items-center my-[0.7rem]">
                  <div className="p-1 bg-slate-400 rounded-full w-[9rem] h-[9rem] relative">
                    <img
                      src={values.avatar}
                      alt={values.id}
                      className=" w-full h-full rounded-full object-cover shadow-sm"
                    />
                  </div>
                </div>
              )}

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

              {/* Role */}
              <div className="w-full flex flex-col justify-between items-start my-[0.7rem]">
                <label className="text-[0.9rem] my-2 font-semibold">
                  Update Role
                </label>

                <Field
                  as="select"
                  name="role"
                  className="text-[0.9rem] p-1 border-2 border-black rounded-md "
                >
                  <option value="">Select User Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Field>
              </div>

              <div className="w-full flex justify-center items-center ">
                <button
                  type="submit"
                  className="w-[95%] bg-rose-500 text-black py-2 rounded-md hover:bg-rose-400 my-5"
                >
                  Update User
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateUser;
