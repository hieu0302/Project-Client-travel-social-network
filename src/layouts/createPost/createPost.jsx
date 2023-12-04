import { Button, Input, Modal, Select, DatePicker, Space } from "antd";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import InputEmoji from "react-input-emoji";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const CreatePost = () => {
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClickCreatePost = () => {};
  return (
    <div className="flex gap-5 my-10">
      <button
        onClick={showModal}
        className="border p-10 rounded-2xl hover:bg-slate-100 flex gap-5 items-center font-bold"
      >
        <FaPersonWalkingLuggage size={35} /> Thêm một chuyến đi mới
      </button>
      <button className="border p-10  rounded-2xl hover:bg-slate-100 flex gap-5 items-center font-bold">
        <GrGallery size={35} /> Thêm một Album mới
      </button>
      <Modal
        title="Tạo một chuyến đi mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" ghost onClick={onClickCreatePost}>
            Đăng
          </Button>,
          <Button danger onClick={handleCancel}>
            Huỷ bỏ
          </Button>,
        ]}
      >
        <div>
          <div className="flex items-center gap-5">
            <img
              src="https://picsum.photos/200/300"
              className=" h-12 w-12 rounded-full border-2 border-white"
            />
            <div>
              <p className="font-bold text-base">Tên người dùng</p>
              <Select
                // defaultValue="Công khai"
                placeholder="Chế độ hiển thị"
                style={{ width: 150 }}
                options={[
                  {
                    value: true,
                    label: (
                      <span className="flex items-center gap-2">
                        <MdOutlinePublic /> <p>Công khai</p>
                      </span>
                    ),
                  },
                  {
                    value: false,
                    label: (
                      <span className="flex items-center gap-2">
                        <RiGitRepositoryPrivateLine /> <p>Chỉ mình tôi</p>
                      </span>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="my-3">
            <InputEmoji
              borderColor="#FFFFFF"
              fontSize={20}
              placeholder="Tiêu đề chuyến đi của bạn"
              size="large"
              theme="light"
            />
          </div>
          <div className="flex justify-center">
            <ImgCrop rotationSlider>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && (
                  <Button size="large" icon={<UploadOutlined />}>
                    Thêm ảnh bìa
                  </Button>
                )}
              </Upload>
            </ImgCrop>
          </div>
          <div className=" mx-8 my-5 ">
            <p className="text-base font-bold">Thời gian chuyến đi: </p>
            <Space className="m-2" direction="vertical" size={20}>
              <RangePicker bordered={false} format={dateFormat} />
            </Space>
          </div>
          <div className=" mx-8 my-5 ">
            <p className="text-base font-bold">Điểm đến: </p>
            <Input bordered={false} placeholder="Điểm đến chuyến đi của bạn" />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default CreatePost;
