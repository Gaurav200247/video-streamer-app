import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSideBar from "../../Components/User/UserSideBar";
import { SingleItem } from "./WishList";
import { getMyDetails } from "../../Actions/UserAction";

const WatchHistory = () => {
  const { user } = useSelector((state) => state.getDetails);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyDetails());
  }, [dispatch]);

  let watch_history =
    user &&
    user.user &&
    user.user.watch_history &&
    user.user.watch_history.length > 0 &&
    user.user.watch_history.map((item, index) => {
      if (
        index < user.user.watch_history.length &&
        index > user.user.watch_history.length - 12
      ) {
        return user.user.watch_history[index];
      }
    });

  watch_history =
    watch_history && watch_history.filter((item) => item !== undefined);

  watch_history = watch_history && watch_history.reverse();

  console.log({ watch_history });

  return (
    <div className="flex justify-between items-center w-full lg:h-[120vh]">
      <div className="w-0 overflow-hidden lg:w-[20%] h-full">
        <UserSideBar />
      </div>

      <div className="w-full lg:w-[80%] h-full bg-slate-500  text-black lg:p-16 py-16 px-5">
        <h1 className="w-full  text-left text-[1.4rem] font-semibold py-3 text-white">
          Your Watch History
        </h1>
        {watch_history && watch_history.length > 0 ? (
          <div className="w-full shadow-md bg-gray-200 max-h-[80vh] rounded-md overflow-y-scroll flex flex-col justify-between items-center ">
            {watch_history.map((item, index) => {
              // console.log(item);
              return <SingleItem key={index} VideoID={item} />;
            })}
          </div>
        ) : (
          <h1>List is Empty</h1>
        )}
      </div>
    </div>
  );
};

export default WatchHistory;
