import React, { Fragment, useEffect } from "react";
import AdminSideBar from "../../Components/User/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearErrors,
  deleteVideoAction,
  getAllVideos,
} from "../../Actions/VideosAction";
import { toast } from "react-toastify";

import { RiEditBoxLine } from "react-icons/ri";
import { BsTrashFill } from "react-icons/bs";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";

const VideoList = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.getAllVideos);

  useEffect(() => {
    dispatch(getAllVideos("", [], 1, false, true));
  }, [dispatch]);

  // console.log(videos);

  return (
    <div className="flex justify-between items-start w-full lg:h-auto">
      {/* sidebar */}
      <div className="w-0 overflow-hidden lg:w-[20%] h-screen">
        <AdminSideBar />
      </div>

      <div className="w-full lg:w-[80%] h-full bg-slate-500  text-black lg:p-16 py-20 px-5">
        <div className="w-full h-full">
          {videos && videos.videos && videos.videos.length > 0 && (
            <SimpleTable data={videos.videos} />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoList;

export const SimpleTable = ({ data }) => {
  // console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isDeleted, deleteError } = useSelector(
    (state) => state.UpdateDeleteVideos
  );

  const deleteVideoHandler = (id) => {
    dispatch(deleteVideoAction(id));
  };

  // console.log({ isDeleted });

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
      dispatch(ClearErrors());
    }

    if (isDeleted) {
      toast.success("Video Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: "DeleteVideoReset" });
    }

    dispatch(getAllVideos());
  }, [dispatch, isDeleted, deleteError, navigate]);

  const columns = [
    { field: "id", headerName: "Video Id", minWidth: 100, flex: 0.7 },
    {
      field: "title",
      headerName: "Title",
      minWidth: 50,
      flex: 0.7,
    },
    {
      field: "views",
      headerName: "Views",
      type: "number",
      minWidth: 50,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/admin/videos/${params.row.id}`}
              className="text-[1.2rem] pr-7  text-lime-500"
            >
              <RiEditBoxLine />
            </Link>

            <button
              className="text-[1.2rem] pr-2 text-red-500"
              onClick={() => deleteVideoHandler(params.row.id)}
            >
              <BsTrashFill />
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  data.forEach((item) => {
    rows.push({
      id: item._id,
      title: item.title,
      views: item.views,
    });
  });

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableSelectionOnClick
      rowHeight={50}
      autoHeight
      // pageSizeOptions={[10]}
      className="bg-white"
    />
  );
};
