import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import VideoDetails from "./Pages/VideoDetails";
import { Latest, MostViewed } from "./Pages/Latest_topRated";
import Categories from "./Pages/Category/Categories";

import Helpline from "./Pages/Misc_pages/Helpline";
import NotFound from "./Pages/Misc_pages/NotFound";

import Login from "./Pages/user_login_signup_pages/Login";
import ResetPassword from "./Pages/user_login_signup_pages/ResetPassword.js";
import ForgotPassword from "./Pages/user_login_signup_pages/ForgotPassword.js";
import SignUp from "./Pages/user_login_signup_pages/SignUp";

import Navbar from "./Components/Navbar/Navbar";
import SingleCategory from "./Pages/Category/SingleCategory";
import Footer from "./Components/Footer/Footer";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import { useSelector } from "react-redux";
import Profile from "./Pages/User_Profile_pages/Profile";
import ProfileUpdate from "./Pages/User_Profile_pages/ProfileUpdate";
import WishList from "./Pages/User_Profile_pages/WishList";
import { loadUser } from "./Actions/UserAction";
import { store } from "./store";
import ProfilePasswordUpdate from "./Pages/User_Profile_pages/ProfilePasswordUpdate";
import VideoPlayerSettings from "./Pages/User_Profile_pages/VideoPlayerSettings";
import WatchHistory from "./Pages/User_Profile_pages/WatchHistory";
import SubtitleSettings from "./Pages/User_Profile_pages/SubtitleSettings";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Pages/Admin_Pages/Dashboard";
import PostVideo from "./Pages/Admin_Pages/PostVideo";
import UpdateVideo from "./Pages/Admin_Pages/UpdateVideo";
import UsersList from "./Pages/Admin_Pages/UsersList";
import UpdateUser from "./Pages/Admin_Pages/UpdateUser";
import ReviewsList from "./Pages/Admin_Pages/ReviewsList";
import VideoList from "./Pages/Admin_Pages/VideoList";
import VideoSearch from "./Pages/VideoSearch";
import Support from "./Pages/Misc_pages/Support";
import About from "./Pages/Misc_pages/About";
import OtherProjects from "./Pages/Misc_pages/OtherProjects";
import Contact from "./Pages/Misc_pages/Contact";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (user && user.user && user.user.role && user.user.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user, isAdmin]);

  return (
    <div className="dark bg-gradient-to-r  from-slate-900 via-zinc-900 to-gray-900  text-white scroll-smooth min-h-screen duration-200">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Navbar user={user} />
      {/* #00050d */}

      {/*Public Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos/:id" element={<VideoDetails />} />

        <Route path="/search/:txt" element={<VideoSearch />} />

        <Route path="/categories" element={<Categories isMargin={true} />} />
        <Route path="/categories/:genre" element={<SingleCategory />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/most_viewed" element={<MostViewed />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:resetToken" element={<ResetPassword />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/other_projects" element={<OtherProjects />} />

        <Route path="/helpline" element={<Helpline />} />
        <Route path="*" element={<NotFound />} />

        {/* -----------USER ROUTES----------- */}
        <Route
          element={
            <ProtectedRoute
              isAdmin={isAdmin}
              isAuthenticated={isAuthenticated}
              AdminRoute={false}
            />
          }
        >
          <Route path="/account" element={<Profile />} />
          <Route path="/account/update" element={<ProfileUpdate />} />
          <Route
            path="/account/update/Password"
            element={<ProfilePasswordUpdate />}
          />
          <Route path="/account/wishlist" element={<WishList />} />
          <Route
            path="/account/settings/video_player"
            element={<VideoPlayerSettings />}
          />
          <Route
            path="/account/settings/subtitle"
            element={<SubtitleSettings />}
          />
          <Route path="/account/history" element={<WatchHistory />} />
        </Route>

        {/* -----------ADMIN ROUTES----------- */}
        <Route
          element={
            <ProtectedRoute
              isAdmin={isAdmin}
              isAuthenticated={isAuthenticated}
              AdminRoute={true}
            />
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/admin/videos" element={<VideoList />} />
          <Route path="/admin/videos/post" element={<PostVideo />} />
          <Route path="/admin/videos/:id" element={<UpdateVideo />} />

          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/users/:id" element={<UpdateUser />} />

          <Route path="/admin/reviews" element={<ReviewsList />} />
        </Route>
      </Routes>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default App;
