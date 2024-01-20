import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotify } from "../../redux/Notification/NotificationAction";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaHeartCirclePlus } from "react-icons/fa6";
import moment from "moment";
moment.locale("vi");

const NotifyCard = () => {
  const { notifyData } = useSelector((state) => state.notify);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllNotify({ idUser: currentUser._id }));
  }, [currentUser]);

  const renderComment = (item) => {
    return (
      item.type === "comment" && (
        <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
          <div className=" inline-flex items-center justify-between w-full">
            <div className="inline-flex items-center gap-3">
              <BiSolidCommentDetail size={25} color="#1E88E5" />
              <h3 className="font-bold text-base text-gray-800">Bình luận</h3>
            </div>
            <p className="text-xs text-gray-500">
              {moment(new Date(item.createdAt)).fromNow()}
            </p>
          </div>

          <p className="mt-1 text-sm">
            <b>{item.senderName}</b> đã bình luận <b>"{item.comment}"</b> bài
            viết <b>{item.titlePost}</b>
          </p>
        </div>
      )
    );
  };

  const renderLike = (item) => {
    return (
      item.type === "like" && (
        <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
          <div className=" inline-flex items-center justify-between w-full">
            <div className="inline-flex items-center gap-3">
              <FaHeartCirclePlus size={25} color="red" />
              {/* <img
                src="https://cdn-icons-png.flaticon.com/512/893/2190552.png"
                alt="Messages Icon"
                className="w-6 h-6 mr-3"
              /> */}
              <h3 className="font-bold text-base text-gray-800">Yêu thích</h3>
            </div>
            <p className="text-xs text-gray-500">
              {moment(new Date(item.createdAt)).fromNow()}
            </p>
          </div>

          <p className="mt-1 text-sm">
            <b>{item.senderName}</b> đã thích bài viết <b>{item.titlePost}</b>{" "}
          </p>
        </div>
      )
    );
  };

  return (
    <div className="w-2/3 ml-10 ">
      <div className="h-screen grid place-items-center py-5 overflow-auto no-scrollbar">
        <div className=" lg:w-2/5 sm:w-3/5 xl:w-11/12 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto border p-10  shadow-xl">
          <div className="inline-flex items-center justify-between w-full">
            <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">
              Thông báo
            </h3>
          </div>
          <p className="mt-8 font-medium text-gray-500 text-sm sm:text-base dark:text-white">
            Hôm nay
          </p>
          {notifyData.map((item) => {
            const createdAt = moment(item.createdAt);
            const now = moment();
            const in24h = now.diff(createdAt, "hours") <= 24;
            if (in24h === true) {
              console.log("24h", item);
              return (
                <>
                  {renderLike(item)}
                  {renderComment(item)}
                </>
              );
            }
          })}

          <p className="mt-8 font-medium text-gray-500 dark:text-white text-sm sm:text-base">
            Những ngày trước
          </p>

          {notifyData.map((item) => {
            const createdAt = moment(item.createdAt);
            const now = moment();
            const in24h = now.diff(createdAt, "hours") > 24;
            if (in24h === true) {
              console.log("24h", item);
              return (
                <>
                  {renderLike(item)}
                  {renderComment(item)}
                </>
              );
            }
          })}
          <button
            className="inline-flex text-sm bg-white justify-center px-4 py-2 mt-12 w-full text-red-500 items-center rounded font-medium
     shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-red-500
hover:text-white hover:-translate-y-1 hover:scale-110 dark:hover:bg-white dark:text-gray-800 dark:hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 sm:mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Clear all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotifyCard;
