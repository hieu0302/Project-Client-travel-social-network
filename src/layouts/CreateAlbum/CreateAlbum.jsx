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
import dayjs from "dayjs";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import InputEmoji from "react-input-emoji";
import ImgCrop from "antd-img-crop";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AlbumAPI from "../../services/albumAPI";
import { boolean } from "yup";
import UploadImage from "./UploadImage/uploadImage";
import UploadImageAPI from "../../services/uploadAPI";
import FormItem from "antd/es/form/FormItem";

const { RangePicker } = DatePicker;

const CreateAlbum = () => {
  const initialValues = {
    public: boolean,
    title: "",
    image: "",
    startDay: "",
    endDay: "",
    location: "",
    description: "",
  };

  const [form] = Form.useForm();
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValues);

  const [dataImage, setDataImage] = useState([]);
  const [uploading, setUploading] = useState(false);

  console.log("hasdhbsd", dataImage);

  const dateFormat = "DD/MM/YYYY";

  const customFormat = (value) => value.format(dateFormat);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onClickCreatePost = async () => {
    try {
      const newData = {
        userId: currentUser._id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        ...value,
        image: [],
      };
      let successfulUploads = 0;

      for (const file of dataImage.dataImage) {
        if (file.status === "removed") {
          continue;
        }
        setUploading(true);
        const formData = new FormData();
        formData.append("image", file.originFileObj);

        await new Promise((resolve, reject) => {
          UploadImageAPI.uploadImage(formData)
            .then((res) => {
              if (res.data.url) {
                newData.image.push(res.data.url);
                successfulUploads++;
              }
              resolve();
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      }

      console.log("Dem so luong anh:", successfulUploads);

      if (successfulUploads === dataImage.dataImage.length) {
        console.log("sdsafdsdf::::::", newData);

        const response = await AlbumAPI.createAlbum(newData);

        if (response.status == 201) {
          message.success("Tạo bài viết mới thành công");

          form.resetFields();

          setIsModalOpen(false);
        }
      } else {
        console.log("Không tải lên được tất cả các hình ảnh");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex gap-5 my-10">
      <button className="border p-10 rounded-2xl hover:bg-slate-100 flex gap-5 items-center font-bold ">
        <FaPersonWalkingLuggage size={35} /> Thêm một chuyến đi mới
      </button>
      <button
        onClick={showModal}
        className="border p-10  rounded-2xl hover:bg-slate-100 flex gap-5 items-center font-bold"
      >
        <GrGallery size={35} /> Thêm một Album mới
      </button>

      <Modal
        title="Tạo một chuyến đi mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          uploading ? (
            <Button loading danger>
              Đang tải lên... Vui lòng chờ!
            </Button>
          ) : (
            <Button
              key="upload"
              type="primary"
              ghost
              onClick={onClickCreatePost}
            >
              Đăng
            </Button>
          ),

          <Button key="cancel" danger onClick={handleCancel}>
            Huỷ bỏ
          </Button>,
        ]}
      >
        <Form form={form}>
          <div className="flex gap-5">
            <img
              src={currentUser.avatar}
              className=" h-14 w-14 rounded-full border-2 border-white"
            />
            <div>
              <p className="font-bold text-base">{currentUser.username}</p>
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
          <Form.Item name="title">
            <div className="my-3">
              <p className="text-base font-bold">Tiêu đề Album: </p>
              <Input
                // borderColor="#FFFFFF"
                fontSize={20}
                placeholder="Tiêu đề chuyến đi của bạn"
                size="large"
                theme="light"
                onChange={(e) => setValue({ ...value, title: e.target.value })}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="image"
            valuePropName="fileList"
            className="w-full text-center"
          >
            <UploadImage
              setUrl={(dataImage) =>
                setDataImage((prevUrl) => ({
                  ...prevUrl,
                  dataImage,
                }))
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
          <Form.Item name="day">
            <div className=" mx-8 my-5 ">
              <p className="text-base font-bold">Thời gian chuyến đi: </p>
              <Space className="m-2" direction="vertical" size={20}>
                <RangePicker
                  onChange={(e) =>
                    setValue({
                      ...value,
                      startDay: dayjs(e[0]["$d"]).format("DD/MM/YYYY"),
                      endDay: dayjs(e[1]["$d"]).format("DD/MM/YYYY"),
                    })
                  }
                  bordered={false}
                  format={dateFormat}
                />
              </Space>
            </div>
          </Form.Item>
          <Form.Item name="location">
            <div className=" mx-8 my-5 ">
              <p className="text-base font-bold">Điểm đến: </p>
              <Input
                bordered={false}
                placeholder="Điểm đến chuyến đi của bạn"
                onChange={(e) =>
                  setValue({ ...value, location: e.target.value })
                }
              />
            </div>
          </Form.Item>
          <Form.Item name="description">
            <div className=" mx-8 my-5 ">
              <p className="text-base font-bold">Chi tiết về Album: </p>
              <Input
                bordered={false}
                placeholder="Cảm xúc của bạn..."
                onChange={(e) =>
                  setValue({ ...value, description: e.target.value })
                }
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateAlbum;
