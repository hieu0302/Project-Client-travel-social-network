import React from "react";
import { Input } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { PiClockClockwise } from "react-icons/pi";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import {
  GoHeart,
  GoCommentDiscussion,
  GoShareAndroid,
  GoBookmark,
} from "react-icons/go";
import CreatePost from "../../layouts/createPost/createPost";

const News = () => {
  return (
    <div className="flex flex-col items-center gap-5 w-1/2">
      <div>
        <CreatePost />
      </div>
      <div className=" bg-white w-3/4 border p-5 rounded-2xl">
        <div className="flex items-center gap-5">
          <div className=" flex justify-center items-center h-14 w-14 bg-gradient-to-r from-indigo-600 to-blue-300  rounded-full">
            <img
              src="https://picsum.photos/200/300"
              className=" h-12 w-12 rounded-full border-2 border-white"
            />
          </div>
          <div>
            <p className=" font-extrabold font-nunito text-lg">
              Tên Người dùng
            </p>
            <p className=" flex gap-3 text-gray-500">
              <PiClockClockwise size={20} color="red" />
              Chuyến đi đã được khởi tạo từ 30 phút trước
            </p>
          </div>
        </div>
        <div className="mt-5 relative">
          <img
            className=" w-full h-96 object-cover rounded-xl border "
            src="https://picsum.photos/200"
          />
          <div className=" text-white  font-bold absolute bottom-10 left-5 drop-shadow-2xl">
            <button className="text-4xl">Title Trip</button>
            <p className="text-xl flex gap-2">
              <IoLocationOutline />
              Địa điểm: Bãi biển Vũng Tàu
            </p>
            <p className="flex gap-3">
              <MdFlightTakeoff size={20} /> Bắt đầu: 01/12/2023
            </p>
            <p className="flex gap-3">
              <MdFlightLand size={20} /> Kết thúc: 01/12/2023
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

      <div className=" bg-white w-3/4 border p-5 rounded-2xl">
        <div className="flex items-center gap-5">
          <div className=" flex justify-center items-center h-14 w-14 bg-gradient-to-r from-indigo-600 to-blue-300  rounded-full">
            <img
              src="https://picsum.photos/200/300"
              className=" h-12 w-12 rounded-full border-2 border-white"
            />
          </div>
          <div>
            <p className=" font-extrabold font-nunito text-lg">
              Tên Người dùng
            </p>
            <p className=" flex gap-3 text-gray-500">
              <PiClockClockwise size={20} color="red" />
              Chuyến đi đã được khởi tạo từ 30 phút trước
            </p>
          </div>
        </div>
        <div className="mt-5 relative">
          <img
            className=" w-full h-96 object-cover rounded-xl border "
            src="https://picsum.photos/200"
          />
          <div className=" text-white  font-bold absolute bottom-10 left-5 drop-shadow-2xl">
            <button className="text-4xl">Title Trip</button>
            <p className="text-xl flex gap-2">
              <IoLocationOutline />
              Địa điểm: Bãi biển Vũng Tàu
            </p>
            <p className="flex gap-3">
              <MdFlightTakeoff size={20} /> Bắt đầu: 01/12/2023
            </p>
            <p className="flex gap-3">
              <MdFlightLand size={20} /> Kết thúc: 01/12/2023
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
    </div>
  );
};

export default News;
