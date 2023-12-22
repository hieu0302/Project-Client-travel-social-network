import React, { useState } from 'react';
import { Input, Dropdown, Space, Button, message, Modal } from "antd";
import { IoLocationOutline } from 'react-icons/io5';
import { MdFlightTakeoff, MdFlightLand,MdOutlineEditNote, MdDeleteOutline, } from 'react-icons/md';
import { GoHeart, GoCommentDiscussion, GoShareAndroid, GoBookmark } from 'react-icons/go';
import { PiClockClockwise,PiDotsThreeCircle  } from 'react-icons/pi';
import { ExclamationCircleFilled } from "@ant-design/icons";
import PostsAPI from '../../services/postsAPI';
import moment from 'moment';
import 'moment/locale/vi'; 
const PostItem = ({ props,currentUser}) => {
  const [isSaved, setIsSaved] = useState(false)
  moment.locale('vi'); 
  const { confirm } = Modal;
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
        // const fetchData = async () => {
        //   try {
        //     dispatch(fetchAllPosts());
        //   } catch (error) {
        //     console.log(error);
        //   }
        // };
        // fetchData();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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
  const handleSavePost = async (postId) => {
    try {
      const response = await PostsAPI.putSavePost(postId)
      setIsSaved(response.data.isSaved); // Cập nhật trạng thái đã lưu hoặc chưa lưu
    } catch (error) {
      console.error('Error saving post:', error);
    }
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
 


  return (
        <div
         
          className=" bg-white w-3/4 border-solid border-2 mb-3 p-5 rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className=" flex justify-center items-center h-14 w-14 bg-gradient-to-r from-indigo-600 to-blue-300  rounded-full">
                <img
                  src={props.avatar}
                  className=" h-12 w-12 rounded-full border-2 border-white"
                />
              </div>
              <div>
                <p className=" font-extrabold font-nunito text-lg">
                  {props.username}
                </p>
                <p className=" flex gap-3 text-gray-500">
                  <PiClockClockwise size={20} color="red" />
                  Chuyến đi đã được khởi tạo từ{" "}
                  {moment(new Date(props.createAt)).fromNow()}
                </p>
              </div>
            </div>
            <div>
              {currentUser._id === props.userId ? (
                <Dropdown
                  menu={{
                    items,
                    onClick: (e) => handleClick(e.key, props._id),
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
              src={props.image[0]}
            />
            <div className=" text-white  font-bold absolute bottom-10 left-5 drop-shadow-2xl">
              <button className="text-4xl">{props.title}</button>
              <p className="text-xl flex gap-2">
                <IoLocationOutline />
                Địa điểm: {props.location}
              </p>
              <p className="flex gap-3">
                <MdFlightTakeoff size={20} /> Bắt đầu: {props.startDay}
              </p>
              <p className="flex gap-3">
                <MdFlightLand size={20} /> Kết thúc: {props.endDay}
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
            <button onClick={() => {
      handleSavePost(props._id); // Gọi hàm handleSavePost với postId tương ứng
    }}>
              <GoBookmark size={25} color={isSaved ? 'orange' : 'black'} />
              {isSaved ? 'Saved' : 'Save'}
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

            
          </div>
        </div>
   
  );
};

export default PostItem;
