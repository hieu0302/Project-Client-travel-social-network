import { useState } from "react";
import Logo from "../../assets/Trip-removebg-preview.png";
import {
  RiHomeWifiLine,
  RiNotification3Line,
  RiBookmark3Line,
  RiInboxArchiveLine,
  RiEarthLine,
  RiFileUserLine,
} from "react-icons/ri";

const menuItems = [
  { icon: RiHomeWifiLine, text: "Trang Chủ" },
  { icon: RiNotification3Line, text: "Thông báo" },
  { icon: RiBookmark3Line, text: "Đã Lưu" },
  { icon: RiInboxArchiveLine, text: "Hộp thư" },
  { icon: RiEarthLine, text: "Khám phá" },
  { icon: RiFileUserLine, text: "Trang cá nhân" },
];

const NavBar = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const onClickHandle = (index) => {
    setSelectedItem(index);
  };

  return (
    <section className="h-screen w-full border sticky top-0">
      <div className="font-nunito text-lg h-screen flex flex-col gap-5 p-10 sticky top-5 w-80">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <div className="flex flex-col h-screen pt-10 gap-5">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center rounded-lg hover:font-extrabold hover:bg-slate-100 h-10 hover:scale-105 transform transition duration-300 ${
                selectedItem === index ? "bg-slate-100 font-extrabold" : ""
              }`}
            >
              <a
                onClick={() => onClickHandle(index)}
                href="#"
                className="flex items-center gap-3 "
              >
                <item.icon size={30} />
                {item.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavBar;
