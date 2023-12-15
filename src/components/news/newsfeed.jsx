import React, { useEffect, useState } from "react";
import { Input, Dropdown, Space, Button, message, Modal } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { PiClockClockwise, PiDotsThreeCircle } from "react-icons/pi";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  MdFlightTakeoff,
  MdFlightLand,
  MdOutlineEditNote,
  MdDeleteOutline,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import {
  GoHeart,
  GoCommentDiscussion,
  GoShareAndroid,
  GoBookmark,
} from "react-icons/go";
import CreatePost from "../../layouts/createPost/createPost";
import PostsAPI from "../../services/postsAPI.js";
import UserAPI from "../../services/userAPI.js";
import { fetchAllPosts } from "../../redux/posts/postActions.js";
import moment from "moment";
import "moment/dist/locale/vi";

moment.locale("vi");

const { confirm } = Modal;

const News = () => {
  const { postsData } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchAllPosts());
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const ShowConfirm = (id) => {
    confirm({
      title: "Xác nhận xoá bài viết:",
      icon: <ExclamationCircleFilled />,
      content: "Bạn chắc chắn muốn xoá bài viết này?",
      okType: "danger",
      okText: "Đồng ý",
      cancelText: "Huỷ bỏ",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleClick = (key, id) => {
    console.log(id);
    console.log(key);
    if (key == 1) {
      ShowConfirm(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await PostsAPI.deleteByID(id);
      console.log(id);
      message.success("Đã xoá bài viết");
    } catch (err) {
      console.log(err);
    }
  };

  const items = [
    {
      icon: <MdOutlineEditNote size={20} />,
      label: `Chỉnh sửa`,
      key: "0",
    },
    {
      icon: <MdDeleteOutline size={20} />,
      label: "Xoá bài viết",
      key: "1",
      danger: true,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-5 w-2/3">
      <div>
        <CreatePost />
      </div>
      {postsData.map((item, index) => (
        <div
          key={index}
          className=" bg-white w-3/4 border-solid border-2 mb-3 p-5 rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className=" flex justify-center items-center h-14 w-14 bg-gradient-to-r from-indigo-600 to-blue-300  rounded-full">
                <img
                  src={item.avatar}
                  className=" h-12 w-12 rounded-full border-2 border-white"
                />
              </div>
              <div>
                <p className=" font-extrabold font-nunito text-lg">
                  {item.username}
                </p>
                <p className=" flex gap-3 text-gray-500">
                  <PiClockClockwise size={20} color="red" />
                  Chuyến đi đã được khởi tạo từ{" "}
                  {moment(new Date(item.createAt)).fromNow()}
                </p>
              </div>
            </div>
            <div>
              {currentUser._id === item.userId ? (
                <Dropdown
                  menu={{
                    items,
                    onClick: (e) => handleClick(e.key, item._id),
                  }}
                  trigger={["click"]}
                >
                  <Button type="link" className=" text-black">
                    <PiDotsThreeCircle size={25} />
                  </Button>
                </Dropdown>
              ) : null}
            </div>
          </div>
          <div className="mt-5 relative">
            <img
              className=" w-full h-96 object-cover rounded-xl border "
              src={item.image[0]}
            />
            <div className=" text-white  font-bold absolute bottom-10 left-5 drop-shadow-2xl">
              <button className="text-4xl">{item.title}</button>
              <p className="text-xl flex gap-2">
                <IoLocationOutline />
                Địa điểm: {item.location}
              </p>
              <p className="flex gap-3">
                <MdFlightTakeoff size={20} /> Bắt đầu: {item.startDay}
              </p>
              <p className="flex gap-3">
                <MdFlightLand size={20} /> Kết thúc: {item.endDay}
              </p>
            </div>
          </div>
          <div className="flex justify-between p-3">
            <div className="flex gap-5 ">
              <button>
                <GoHeart size={25} color="red" fontWeight={1} />
              </button>
              <button>
                <GoCommentDiscussion size={25} />
              </button>
              <button>
                <GoShareAndroid size={25} />
              </button>
            </div>
            <button>
              <GoBookmark size={25} color="orange" />
            </button>
          </div>
          <div className=" px-4">
            <p className="">1000 lượt yêu thích</p>
          </div>
          <div className="px-2 flex">
            <Input
              size="large"
              placeholder="Thêm bình luận..."
              bordered={false}
            />

            <button className=" p-2 rounded-2xl text-blue-700 hover:bg-slate-100">
              Đăng
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
