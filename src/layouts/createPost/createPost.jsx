import {
  Button,
  Input,
  Modal,
  Select,
  DatePicker,
  Space,
  Form,
  message,
} from "antd";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import InputEmoji from "react-input-emoji";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadAvatar from "./UploadImage/uploadImage";
import PostsAPI from "../../services/postsAPI";
import { boolean } from "yup";

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const CreatePost = () => {
  const initialValues = {
    public: boolean,
    title: "",
    image: "",
  };

  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [value, setValue] = useState(initialValues);
  const [cloudinaryUrl, setCloudinaryUrl] = useState([]);

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
  const handleChange = (field, value) => {
    setValue((prevValue) => ({
      ...prevValue,
      [field]: value,
    }));
  };
  console.log(value);
  const onClickCreatePost = async () => {
    try {
      const newData = { userId: currentUser._id, ...value, ...cloudinaryUrl };
      console.log("Hieu", newData);
      await PostsAPI.createPost(newData);
      message.success("Cập nhật thông tin thành công.");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
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
            <Button
              key="upload"
              type="primary"
              ghost
              onClick={onClickCreatePost}
            >
              Đăng
            </Button>,
            <Button key="cancel" danger onClick={handleCancel}>
              Huỷ bỏ
            </Button>,
          ]}
        >
          <Form>
            <div className="flex items-center gap-5">
              <img
                src="https://picsum.photos/200/300"
                className=" h-12 w-12 rounded-full border-2 border-white"
              />
              <div>
                <p className="font-bold text-base">Tên người dùng</p>
                <Form.Item
                  name="public"
                  rules={[
                    { required: true, message: "Hãy chọn chế độ hiển thị" },
                  ]}
                >
                  <Select
                    onChange={(e) => setValue({ ...value, public: e })}
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
                </Form.Item>
              </div>
            </div>
            <div className="my-3">
              <Form.Item>
                <Input
                  // borderColor="#FFFFFF"
                  fontSize={20}
                  placeholder="Tiêu đề chuyến đi của bạn"
                  size="large"
                  theme="light"
                  onChange={(e) =>
                    setValue({ ...value, title: e.target.value })
                  }
                />
              </Form.Item>
            </div>
            <Form.Item name="avatar" valuePropName="fileList">
              <UploadAvatar
                setUrl={(link) =>
                  setCloudinaryUrl({ ...cloudinaryUrl, image: link })
                }
              />
            </Form.Item>
            {/* <div className="flex justify-center">
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
          </div> */}
            <div className=" mx-8 my-5 ">
              <p className="text-base font-bold">Thời gian chuyến đi: </p>
              <Space className="m-2" direction="vertical" size={20}>
                <RangePicker bordered={false} format={dateFormat} />
              </Space>
            </div>
            <div className=" mx-8 my-5 ">
              <p className="text-base font-bold">Điểm đến: </p>
              <Input
                bordered={false}
                placeholder="Điểm đến chuyến đi của bạn"
              />
            </div>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default CreatePost;
