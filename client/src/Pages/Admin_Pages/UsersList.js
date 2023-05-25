import React, { Fragment, useEffect } from "react";
import AdminSideBar from "../../Components/User/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, deleteUser, getAllUsers } from "../../Actions/UserAction";
import Loader from "../../Components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { RiEditBoxLine } from "react-icons/ri";
import { BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

const UsersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users, loading } = useSelector((state) => state.getAllUsers);

  return (
    <div className="flex justify-between items-center w-full lg:h-[110vh]">
      {/* sidebar */}
      <div className="w-0 overflow-hidden lg:w-[20%] h-full">
        <AdminSideBar />
      </div>

      {loading ? (
        <Loader msg="Loading Users..." />
      ) : (
        <div className="w-full lg:w-[80%] h-full bg-slate-500  text-black lg:p-16 py-20 px-5">
          <div className="w-full h-full">
            {users && users.users && users.users.length > 0 && (
              <SimpleTable data={users.users} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;

export const SimpleTable = ({ data }) => {
  // console.log(data);
  // console.log({ isDeleted });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isDeleted, deleteError } = useSelector(
    (state) => state.deleteUpdateUser
  );

  const deleteVideoHandler = (id) => {
    dispatch(deleteUser(id));
  };

  console.log(isDeleted);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
      dispatch(ClearErrors());
    }

    if (isDeleted) {
      toast.success("User Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: "DeleteUserReset" });
    }
  }, [dispatch, isDeleted, deleteError, navigate]);

  const columns = [
    { field: "id", headerName: "User Id", minWidth: 100, flex: 0.6 },
    {
      field: "name",
      headerName: "User Name",
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 50,
      flex: 0.7,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 50,
      flex: 0.3,
    },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/admin/users/${params.row.id}`}
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
      name: item.user_name,
      email: item.email,
      role: `${item.role}`,
    });
  });

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableSelectionOnClick
      rowHeight={50}
      autoHeight
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10]}
      className="bg-white"
    />
  );
};
