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
import { TiDeleteOutline } from "react-icons/ti";
import InputEmoji from "react-input-emoji";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostsAPI from "../../services/postsAPI";
import { boolean } from "yup";
import UploadImage from "./UploadImage/uploadImage";
import { postSliceAction } from "../../redux/posts/postSlice";
import FormItem from "antd/es/form/FormItem";

const { RangePicker } = DatePicker;

const CreatePost = () => {
  const initialValues = {
    public: boolean,
    title: "",
    image: "",
    startDay: "",
    endDay: "",
    location: "",
  };

  const templateValue = {
    time: "",
    location: "",
    id: "",
  };

  const [form] = Form.useForm();
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValues);
  const [cloudinaryUrl, setCloudinaryUrl] = useState([]);
  const [inputTimeline, setInputTimeline] = useState([]);

  const dateFormat = "DD/MM/YYYY HH:mm";

  const customFormat = (value) => value.format(dateFormat);

  const addInputTimeline = () => {
    setInputTimeline([...inputTimeline, templateValue]);
  };

  const newValueInput = [...inputTimeline];
  console.log("InputTimeline", newValueInput[0]);

  const removeInputTimeline = (index) => {
    console.log(index);
    const input = [...inputTimeline];
    input.splice(index, 1);
    setInputTimeline(input);
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
    setInputTimeline([""]);
    form.resetFields();
  };

  const onClickCreatePost = async () => {
    try {
      const newData = {
        userId: currentUser._id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        ...value,
        ...cloudinaryUrl,
      };
      const result = await PostsAPI.createPost(newData);
      if (result.status == 201) {
        message.success("Tạo bài viết mới thành công");
        form.resetFields();
        setIsModalOpen(false);
        dispatch(postSliceAction.createPost(result.data.newPostData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex gap-5 my-10">
        <button
          onClick={showModal}
          className="border p-10 rounded-2xl bg-white hover:bg-slate-200 flex gap-5 items-center font-bold"
        >
          <FaPersonWalkingLuggage size={35} /> Thêm một chuyến đi mới
        </button>
        <button className="border p-10  rounded-2xl bg-white hover:bg-slate-200 flex gap-5 items-center font-bold">
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
            <div className="my-3">
              <Form.Item name="title">
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
              <UploadImage
                setUrl={(link) =>
                  setCloudinaryUrl({ ...cloudinaryUrl, image: link })
                }
              />
            </Form.Item>

            <div className=" mx-8 my-5 ">
              <FormItem name="day">
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
              </FormItem>
            </div>
            <div className=" mx-8 my-5 ">
              <FormItem name="location">
                <p className="text-base font-bold">Điểm đến: </p>
                <Input
                  bordered={false}
                  placeholder="Điểm đến chuyến đi của bạn"
                  onChange={(e) =>
                    setValue({ ...value, location: e.target.value })
                  }
                />
              </FormItem>
              {/* <p className=" text-base font-bold">Timeline:</p> */}
              {inputTimeline.map((item, index) => {
                return (
                  <FormItem name="timeline" key={index}>
                    <b> Mốc thời gian {index + 1} </b>
                    <div className="flex gap-2 justify-around">
                      <DatePicker
                        showTime
                        format={dateFormat}
                        className="w-2/5"
                        onChange={(e) => {
                          setInputTimeline({
                            ...inputTimeline,
                            time: e.target.value,
                          });
                        }}
                      />
                      <Input
                        placeholder="Điểm đến chuyến đi của bạn"
                        className="w-1/2"
                        onChange={(e) => {
                          newValueInput[index] = {
                            ...newValueInput,
                            location: e.target.value,
                          };
                          setInputTimeline(
                            ...setInputTimeline,
                            newValueInput[index]
                          );
                        }}
                      />
                      {inputTimeline.length !== 1 && (
                        <button
                          onClick={() => removeInputTimeline(index)}
                          className=" hover:text-red-700"
                        >
                          <TiDeleteOutline size={25} />
                        </button>
                      )}
                    </div>
                  </FormItem>
                );
              })}
              <div className=" text-center w-full">
                <Button onClick={addInputTimeline}>
                  + Thêm timeline cho chuyến đi
                </Button>
              </div>
            </div>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default CreatePost;
