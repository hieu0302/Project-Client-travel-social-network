import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Avatar, Badge, Button, Switch, Space } from "antd";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";

const UserProfileCard = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className=" w-1/3 mt-10 ">
      <div className="flex flex-col justify-center max-w-xs mx-auto bg-white shadow-xl rounded-xl pt-5 px-8 pb-2">
        <div className="w-20 mx-auto  rounded-full">
          {/* <Badge dot="true" color="green">
            <Avatar shape="circle" size={64} src="https://picsum.photos/200" />
          </Badge> */}
          <Badge dot={true} color="green">
            <img
              className=" w-20 mx-auto shadow-xl rounded-full"
              src={currentUser?.avatar}
              alt="Profile face"
            />
          </Badge>
        </div>
        <div className="text-center mt-5">
          <p className="text-xs sm:text-base text-gray-800  w-auto inline-block ">
            Xin chào
          </p>
          <p className="  text-xl font-semibold text-gray-900 pt-2 pb-4 px-5 border-b-2">
            {currentUser.username}
          </p>
          <div className="flex align-center justify-center">
            <a className="text-xl m-2 p-2  text-gray-800 hover:bg-gray-800 rounded-full hover:text-white transition-colors duration-300">
              {/* <Badge>
                <IoIosNotifications size={25} />
              </Badge> */}
              <FaGithub />
              <span class="sr-only">Github</span>
            </a>
            <a className="text-xl m-2 p-2 text-pink-800 hover:bg-pink-800 rounded-full hover:text-white transition-colors duration-300">
              <FaYoutube />
              <span class="sr-only">Youtube</span>
            </a>
            <a className="text-xl m-2 p-2 text-blue-800 hover:bg-blue-800 rounded-full hover:text-white transition-colors duration-300">
              <FaTwitter />
              <span class="sr-only">Twitter</span>
            </a>
            <a className="text-xl m-2 p-2 text-teal-800 hover:bg-teal-800 rounded-full hover:text-white transition-colors duration-300">
              <FaLinkedin />
              <span class="sr-only">Linkedin</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
