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
import { useSelector } from "react-redux";

const menuItems = [
  { icon: RiHomeWifiLine, text: "Những chuyến đi", to: "/" },
  { icon: RiCamera3Line, text: "Bộ sưu tập", to: "/album" },
  { icon: RiNotification3Line, text: "Thông báo", to: "/notify" },
  { icon: RiBookmark3Line, text: "Đã Lưu", to: "/bookmark" },
  { icon: RiInboxArchiveLine, text: "Hộp thư", to: "/inbox" },
  { icon: RiEarthLine, text: "Khám phá", to: "/discovery" },
  { icon: RiFileUserLine, text: "Trang cá nhân", to: "/profile" },
];

const NavBar = () => {
  const [notifyLike, setNotifyLike] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const { currentUser } = useSelector((state) => state.auth);
  console.log("ABC>>>", currentUser);

  useEffect(() => {
    socket.on("getNotificationLike", (data) => {
      setNotifyLike((prev) => [...prev, data]);
      // console.log("DATA:::???", data);

      createNotify(data.dataSendLike);

      openNotification(data.dataSendLike);
    });
    socket.on("getNotifyComment", (data) => {
      setNotifyLike((prev) => [...prev, data]);

      createNotify(data.dataSendComment);

      openNotification(data.dataSendComment);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("SendPending", (dataPending) => {
      console.log("dataSendComment", dataPending);
      const data = dataPending.dataPending.data;
      setNotifyLike(data);
      if (data.length !== 0) {
        openNotification(data);
      }

      // if (data) {
      //   data.map((item) => {
      //     createNotify(item);
      //   });
      // }
    });
  }, []);

  const openNotification = (data) => {
    console.log("DATA Length", data);
    if (data.pending === false) {
      if (data.type === "like") {
        api.info({
          message: `Thông báo`,
          description: `${data.senderName} đã thích bài viết ${data.titlePost} của bạn`,
        });
        return;
      }
      api.info({
        message: `Thông báo`,
        description: `${data.senderName} đã bình luận "${data.comment}" vào bài viết ${data.titlePost} của bạn`,
      });
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
    }
  };

  console.log("DATA_SEND", notifyLike);
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
              {notifyLike.length !== 0 && index == 2 && (
                <div className="  ml-5 w-5 h-5 bg-red-600 rounded-full">
                  <p className=" text-white text-center text-sm">
                    {notifyLike.length}
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
