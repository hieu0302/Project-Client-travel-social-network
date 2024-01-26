import { useEffect, useState } from "react";
import Logo from "../../assets/Trip-removebg-preview.png";
import {
  RiHomeWifiLine,
  RiNotification3Line,
  RiBookmark3Line,
  RiInboxArchiveLine,
  RiEarthLine,
  RiFileUserLine,
  RiLogoutBoxLine,
  RiCamera3Line,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { message, notification } from "antd";
import socket from "../../components/Socket/Soket.js";
import NotifyAPI from "../../services/notifyAPI.js";
import PendingAPI from "../../services/pendingNotifyAPI.js";
import { useDispatch, useSelector } from "react-redux";
import { chatRoomSliceAction } from "../../redux/chat/ChatSlice.js";
import { notifySliceAction } from "../../redux/Notification/NotificationSilce.js";

const menuItems = [
  { icon: RiHomeWifiLine, text: "Những chuyến đi", to: "/" },
  { icon: RiCamera3Line, text: "Bộ sưu tập", to: "/album" },
  { icon: RiNotification3Line, text: "Thông báo", to: "/notify" },
  { icon: RiBookmark3Line, text: "Đã Lưu", to: "/bookmark" },
  { icon: RiInboxArchiveLine, text: "Hộp thư", to: "/inbox" },
  { icon: RiEarthLine, text: "Khám phá" },
  { icon: RiFileUserLine, text: "Trang cá nhân", to: "/profile" },
];

const NavBar = () => {
  const [notifyLike, setNotifyLike] = useState([]);
  const [messagePending, setMessagePending] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const { currentUser } = useSelector((state) => state.auth);
  const { notyfyMessage, idRoomChat, deleteNavNumber } = useSelector(
    (state) => state.chatRoom
  );
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("getNotificationLike", (data) => {
      setNotifyLike((prev) => [...prev, data]);

      createNotify(data.dataSendLike);

      openNotification(data.dataSendLike);
    });
    socket.on("getNotifyComment", (data) => {
      setNotifyLike((prev) => [...prev, data]);

      createNotify(data.dataSendComment);

      openNotification(data.dataSendComment);
    });
    socket.on("getMessage", (data) => {
      setMessagePending((prev) => [...prev, data]);
      dispatch(chatRoomSliceAction.getNotifyMessage(data.dataSendMessage));
      openNotification(data.dataSendMessage);
    });
  }, [socket]);

  useEffect(() => {
    if (notyfyMessage.length !== 0) {
      const audio = new Audio("../../assets/notify.mp3");
      audio.play();
    }
  }, [notyfyMessage]);

  useEffect(() => {
    socket.on("SendPending", (dataPending) => {
      const data = dataPending.dataPending.data;
      const dataFilter = data?.filter((item) => item.type == "message");
      console.log("DATA____", dataFilter);
      setNotifyLike(data?.filter((item) => item.type !== "message"));
      setMessagePending(data?.filter((item) => item.type == "message"));

      dispatch(chatRoomSliceAction.getPendingMessage(dataFilter));

      if (data.length !== 0) {
        openNotification(data);
      }
    });
  }, [socket]);

  const handleOpenSearch = (index) => {
    if (index === 5) {
      dispatch(notifySliceAction.openSearch(true));
    }
  };

  const openNotification = (data) => {
    if (data.pending === false) {
      if (data.type === "like") {
        api.info({
          message: `Thông báo`,
          description: `${data.senderName} đã thích bài viết ${data.titlePost} của bạn`,
        });
        return;
      }
      if (data.type === "comment") {
        api.info({
          message: `Thông báo`,
          description: `${data.senderName} đã bình luận "${data.comment}" vào bài viết ${data.titlePost} của bạn`,
        });
        return;
      }
      if (data.type === "message") {
        api.info({
          message: "Thông báo",
          description: `${data.nameSender} đã gửi tin nhắn "${data.text}" cho bạn`,
        });
      }
    } else {
      api.info({
        message: `Thông báo`,
        description: `Bạn có ${data.length} thông báo mới`,
      });
    }
  };

  const createNotify = async (data) => {
    const newNotify = {
      senderName: data.senderName,
      titlePost: data.titlePost,
      idReceiver: data.idReceiver,
      idPost: data.idPost,
      comment: data.comment,
      type: data.type,
    };
    try {
      const response = await NotifyAPI.createNotify(newNotify);
      if (response.status === 201) {
        message.success("Đã lưu thông báo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotify = (index) => {
    if (index == 2) {
      setNotifyLike([]);
      const deletePending = async () => {
        try {
          await PendingAPI.deletePending(currentUser._id);
        } catch (error) {
          console.log(error);
        }
      };
      deletePending();
      return;
    }
  };

  useEffect(() => {
    if (deleteNavNumber || idRoomChat) {
      setMessagePending("");
    }
  }, [deleteNavNumber, idRoomChat]);

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <section className="h-screen border sticky top-0 bg-white shadow-lg">
      {contextHolder}
      <div className="font-nunito text-lg h-screen flex flex-col gap-5 p-10 sticky top-5 w-80">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <div className="flex flex-col h-screen pt-5 pl-3 gap-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center rounded-lg hover:font-extrabold hover:bg-slate-100 h-10 hover:scale-105 transform transition duration-300 `}
            >
              {item.text !== "Khám phá" ? (
                <NavLink
                  to={item.to}
                  className={({ isActive }) => {
                    const activeClass = isActive ? " font-extrabold" : "";
                    return ` ${activeClass} flex items-center gap-3`;
                  }}
                  onClick={() => handleNotify(index)}
                >
                  <item.icon size={30} />
                  {item.text}
                </NavLink>
              ) : (
                <div
                  onClick={() => handleOpenSearch(index)}
                  className="flex items-center gap-3 hover:cursor-pointer"
                >
                  <item.icon size={30} />
                  {item.text}
                </div>
              )}

              {notifyLike.length !== 0 && index == 2 && (
                <div className="  ml-5 w-5 h-5 bg-red-600 rounded-full">
                  <p className=" text-white text-center text-sm">
                    {notifyLike.length}
                  </p>
                </div>
              )}
              {messagePending.length !== 0 && index == 4 && (
                <div className="  ml-10 w-5 h-5 bg-red-600 rounded-full">
                  <p className=" text-white text-center text-sm">
                    {messagePending.length}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={handleLogOut}
            className="flex pl-3 gap-5 items-center rounded-lg hover:font-extrabold hover:bg-slate-100 h-10 hover:scale-105 transform transition duration-300"
          >
            <RiLogoutBoxLine size={30} /> <p>Đăng xuất</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
