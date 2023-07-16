import React, { useEffect } from "react";
import AdminSideBar from "../../Components/User/AdminSideBar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/UserAction";
import { getAllVideos } from "../../Actions/VideosAction";
import { SimpleBtns } from "../User_Profile_pages/Profile";
import { TbVideoPlus } from "react-icons/tb";
import { TfiVideoCamera } from "react-icons/tfi";
import { FiUsers } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { videos } = useSelector((state) => state.getAllVideos);

  const { users } = useSelector((state) => state.getAllUsers);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllVideos("", [], 1, false, true));
  }, [dispatch]);

  let TotalAdminUsers = 0;
  users &&
    users.users &&
    users.users.length > 0 &&
    users.users.forEach((item) => {
      if (item.role === "admin") {
        TotalAdminUsers++;
      }
    });

  console.log({ TotalAdminUsers });

  let viewsList = [],
    labels = [];

  let TotalViews = 0;

  videos &&
    videos.videos &&
    videos.videos.length > 0 &&
    videos.videos.forEach((item) => {
      viewsList.push({
        views: item.views,
        videoID: item._id,
        title: item.title,
      });
      TotalViews = item.views + TotalViews;
    });

  viewsList =
    viewsList && viewsList.sort((a, b) => b.views - a.views).splice(0, 10);

  viewsList.forEach((item) => labels.push(item.title));
  console.log({ viewsList });

  console.log({ labels });

  const VideoChartData = {
    labels,
    datasets: [
      {
        label: "views",
        data: viewsList.map((item) => item.views),
        backgroundColor: "orange",
      },
    ],
  };

  const UsersDoughnutState = {
    labels: ["Normal Users", "Admin Users"],
    datasets: [
      {
        backgroundColor: ["#0549a5", "red"],
        hoverBackgroundColor: ["darkblue", "darkred"],
        data: [users && users.nbHIts, TotalAdminUsers],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Most Viewed Videos",
      },
    },
  };

  return (
    <div className="flex justify-between items-start w-full lg:h-[300vh]">
      {/* sidebar */}
      <div className="w-0 overflow-hidden md:w-[20%] h-full">
        <AdminSideBar />
      </div>

      <div className="w-full lg:w-[80%] h-full bg-slate-500  text-black p-16">
        <h1 className="text-white text-[1.5rem] font-medium">
          Analytics Dashboard
        </h1>

        <div className="w-full flex justify-start items-center my-5">
          <SimpleBtns icon={<IoMdArrowBack />} to="/account" />
          <SimpleBtns icon={<TbVideoPlus />} to="/admin/videos/post" />
          <SimpleBtns icon={<TfiVideoCamera />} to="/admin/videos" />
          <SimpleBtns icon={<FiUsers />} to="/admin/users" />
        </div>

        <div className="flex justify-between items-center w-full   bg-zinc-100 my-3 p-2 rounded-md shadow-md">
          <h1 className="p-2 text-blue-500 font-semibold  text-[1.2rem] whitespace-nowrap">
            <span className=" font-medium text-black">Total Videos : </span>
            {videos && videos.nbHits} videos
          </h1>

          <h1 className="p-2 text-green-500 font-semibold  text-[1.2rem] whitespace-nowrap">
            <span className=" font-medium text-black">Total Users : </span>
            {users && users.nbHIts} users
          </h1>

          <h1 className="p-2 text-orange-500 font-semibold  text-[1.2rem] whitespace-nowrap">
            <span className="font-medium text-black">Total Views : </span>
            {TotalViews} views
          </h1>
        </div>

        <div className="flex justify-between items-start w-full">
          <div className="bg-white p-5  w-[45%] hover:shadow-md rounded-lg">
            <Doughnut data={UsersDoughnutState} />
          </div>

          <div className="w-[50%] flex justify-center items-center hover:shadow-md rounded-lg bg-white">
            {/*---------- Likes/Dislikes chart adding soon....----------*/}
            {/* <Bar options={options} data={VideoChartData} /> */}
          </div>
        </div>
        <div className="bg-white my-5 p-5 w-full hover:shadow-md rounded-lg">
          <Bar options={options} data={VideoChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
