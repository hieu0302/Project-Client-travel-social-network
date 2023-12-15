import { useState } from "react";
import Logo from "../../assets/Trip-removebg-preview.png";
import {
  RiHomeWifiLine,
  RiNotification3Line,
  RiBookmark3Line,
  RiInboxArchiveLine,
  RiEarthLine,
  RiFileUserLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { message } from "antd";

const menuItems = [
  { icon: RiHomeWifiLine, text: "Trang Chủ", to: "/posts" },
  { icon: RiNotification3Line, text: "Thông báo", to: "/notify" },
  { icon: RiBookmark3Line, text: "Đã Lưu", to: "/bookmark" },
  { icon: RiInboxArchiveLine, text: "Hộp thư", to: "/inbox" },
  { icon: RiEarthLine, text: "Khám phá", to: "/discovery" },
  { icon: RiFileUserLine, text: "Trang cá nhân", to: "/profile" },
];

const NavBar = () => {
  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <section className="h-screen border sticky top-0">
      <div className="font-nunito text-lg h-screen flex flex-col gap-5 p-10 sticky top-5 w-80">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <div className="flex flex-col h-screen pt-10 gap-5">
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
              >
                <item.icon size={30} />
                {item.text}
              </NavLink>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={handleLogOut}
            className="flex gap-5 items-center rounded-lg hover:font-extrabold hover:bg-slate-100 h-10 hover:scale-105 transform transition duration-300"
          >
            <RiLogoutBoxLine size={30} /> <p>Đăng xuất</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
