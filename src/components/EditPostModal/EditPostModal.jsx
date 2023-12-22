/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  message,
  Select,
  Form,
  DatePicker,
  Image,
  Space,
} from "antd";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import UploadImage from "../../layouts/createPost/UploadImage/uploadImage";
import PostsAPI from "../../services/postsAPI";
import dayjs from "dayjs";
import { BsTrash } from "react-icons/bs";
import { fetchAllPosts } from "../../redux/posts/postActions";
import { useDispatch } from "react-redux";

const { Option } = Select;
const { RangePicker } = DatePicker;

const EditPostModal = ({ post, onCancel, onSave }) => {
  const [editedData, setEditedData] = useState({
    public: post.public,
    title: post.title,
    image: post.image,
    startDay: post.startDay,
    endDay: post.endDay,
    location: post.location,
  });
  const [cloudinaryUrl, setCloudinaryUrl] = useState(post.image);
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedData({
      public: post.public,
      title: post.title,
      image: post.image,
      startDay: post.startDay,
      endDay: post.endDay,
      location: post.location,
    });
    setCloudinaryUrl(post.image);
  }, [post]);

  const handleSave = async () => {
    try {
      const updatedData = {
        public: editedData.public,
        title: editedData.title,
        image: editedData.image,
        startDay: editedData.startDay,
        endDay: editedData.endDay,
        location: editedData.location,
      };
      await PostsAPI.update(post._id, updatedData);
      dispatch(fetchAllPosts());
      message.success("Đã cập nhật bài viết");
      onSave(); // Update UI or refetch the post list
      onCancel();
    } catch (error) {
      console.error(error);
      message.error("Đã xảy ra lỗi khi cập nhật bài viết");
    }
  };

  const dateFormat = "DD/MM/YYYY";

  return (
    <Modal
      open={true}
      title="Chỉnh sửa bài viết"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy bỏ
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Lưu lại
        </Button>,
      ]}
    >
      <Form>
        {/* User Information Section */}
        <div className="flex gap-5">
          <img
            src={post.avatar}
            className="h-14 w-14 rounded-full border-2 border-white"
            alt="User Avatar"
          />
          <div>
            <p className="font-bold text-base">{post.username}</p>
            <Select
              onChange={(value) =>
                setEditedData({ ...editedData, public: value })
              }
              placeholder="Chế độ hiển thị"
              style={{ width: 150 }}
              value={editedData.public}
            >
              <Option value={true}>
                <span className="flex items-center gap-2">
                  <MdOutlinePublic /> <p>Công khai</p>
                </span>
              </Option>
              <Option value={false}>
                <span className="flex items-center gap-2">
                  <RiGitRepositoryPrivateLine /> <p>Chỉ mình tôi</p>
                </span>
              </Option>
            </Select>
          </div>
        </div>

        {/* Title Section */}
        <div className="my-3">
          <Form.Item>
            <Input
              value={editedData.title}
              onChange={(e) =>
                setEditedData({ ...editedData, title: e.target.value })
              }
              placeholder="Tiêu đề chuyến đi của bạn"
              size="large"
            />
          </Form.Item>
        </div>

        {/* Image Upload Section */}
        <Form.Item name="avatar" valuePropName="fileList">
          <UploadImage
            setUrl={(link) => setEditedData({ ...editedData, image: link })}
          />
        </Form.Item>

        {/* Date Picker Section */}
        <div className="mx-8 my-5">
          <p className="text-base font-bold">Thời gian chuyến đi: </p>
          <DatePicker.RangePicker
            onChange={(dates) =>
              setEditedData({
                ...editedData,

                startDay: dates[0]
                  ? dayjs(dates[0]).format("DD/MM/YYYY ")
                  : null,
                endDay: dates[1] ? dayjs(dates[1]).format("DD/MM/YYYY") : null,
              })
            }
            bordered={false}
            format="DD/MM/YYYY"
            // showTime={{ format: "HH:mm" }}
            defaultValue={[
              editedData.startDay
                ? dayjs(editedData.startDay, dateFormat)
                : null,
              editedData.endDay ? dayjs(editedData.endDay, dateFormat) : null,
            ]}
          />
        </div>

        {/* Location Input Section */}
        <div className="mx-8 my-5">
          <p className="text-base font-bold">Điểm đến: </p>
          <Input
            value={editedData.location}
            onChange={(e) =>
              setEditedData({ ...editedData, location: e.target.value })
            }
            bordered={false}
            placeholder="Điểm đến chuyến đi của bạn"
          />
        </div>
      </Form>
    </Modal>
  );
};

export default EditPostModal;
