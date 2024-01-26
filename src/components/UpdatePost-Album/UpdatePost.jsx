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
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../../layouts/createPost/UploadImage/uploadImage";
import { postSliceAction } from "../../redux/posts/postSlice";
import TagUser from "../../components/TagUser/TagUser";
import { useEffect, useState } from "react";
import PostsAPI from "../../services/postsAPI";

const { RangePicker } = DatePicker;

const UpdatePost = () => {
  const templateValue = {
    time: "",
    location: "",
    id: "",
  };
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const dateFormat = "DD/MM/YYYY";
  const customFormat = (value) => value.format(dateFormat);

  console.log("Form", form);

  const [cloudinaryUrl, setCloudinaryUrl] = useState([]);
  const [datePicker, setDatePicker] = useState([]);
  const { tagUser } = useSelector((state) => state.posts);

  const { postsData, openModal, getIdPost, indexPost } = useSelector(
    (state) => state.posts
  );

  const [inputTimeline, setInputTimeline] = useState([]);
  const { currentUser } = useSelector((state) => state.auth);

  const initialValues = {
    public: getIdPost.public,
    title: getIdPost.title,
    startDay: getIdPost.startDay,
    endDay: getIdPost.endDay,
    location: getIdPost.location,
  };

  const [imageOld, setImageOld] = useState();

  const [value, setValue] = useState(initialValues);
  const [update, setUpdate] = useState([]);

  const [abc, setabc] = useState("true");

  const postDataById = postsData.find((item) => item._id === getIdPost);
  //   const newValueInput = [inputTimeline];

  const addInputTimeline = () => {
    setInputTimeline([...inputTimeline, templateValue]);
  };

  useEffect(() => {
    setUpdate(postsData);
  }, [postsData]);
  console.log("Update", postsData);

  useEffect(() => {
    form.resetFields();
    setValue(initialValues);
    dispatch(postSliceAction.getUrlImage(getIdPost.image));
    if (getIdPost?.timeline) {
      setInputTimeline(getIdPost.timeline);
      return;
    }
  }, [getIdPost]);

  const removeInputTimeline = (index) => {
    console.log(index);
    const input = [...inputTimeline];
    input.splice(index, 1);
    setInputTimeline(input);
  };

  const handleOk = () => {
    handleUpdate();
    dispatch(postSliceAction.openModal(false));
  };
  const handleCancel = () => {
    dispatch(postSliceAction.openModal(false));
    form.resetFields();
    // setInputTimeline([]);
  };

  const handleUpdate = async () => {
    try {
      const newDataUpdate = {
        ...value,
        timeline: inputTimeline,
        tagUser: tagUser,
        ...cloudinaryUrl,
      };

      const updateRedux = () => {
        const updatePost = postsData.map((item, i) => {
          if (i === indexPost) {
            return { ...item, ...newDataUpdate };
          } else {
            return item;
          }
        });
        dispatch(postSliceAction.updatePost(updatePost));
      };

      const respons = await PostsAPI.update(getIdPost._id, newDataUpdate);
      if (respons.status === 200) {
        message.success("Cập nhật bài viết thành công");
        updateRedux();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disabledDate = (current) => {
    return (
      current &&
      (current < dayjs(getIdPost.startDay).endOf("day") ||
        current > dayjs(getIdPost.endDay).endOf("day"))
    );
  };
  return (
    <Modal
      title="Tạo một chuyến đi mới"
      open={openModal}
      onOk={handleOk}
      //   onCancel={handleCancel}
      footer={[
        <Button key="update" type="primary" ghost onClick={handleOk}>
          Cập nhật
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
              rules={[{ required: true, message: "Hãy chọn chế độ hiển thị" }]}
            >
              <Select
                defaultValue={getIdPost.public}
                onChange={(e) => setValue({ ...value, public: e })}
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
              defaultValue={getIdPost.title}
              fontSize={20}
              placeholder="Tiêu đề chuyến đi của bạn"
              size="large"
              theme="light"
              onChange={(e) => setValue({ ...value, title: e.target.value })}
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
          <Form.Item name="day">
            <p className="text-base font-bold">Thời gian chuyến đi: </p>
            <Space className="m-2" direction="vertical" size={20}>
              <RangePicker
                defaultValue={[
                  getIdPost.startDay
                    ? dayjs(getIdPost.startDay, dateFormat)
                    : null,
                  getIdPost.endDay ? dayjs(getIdPost.endDay, dateFormat) : null,
                ]}
                onChange={(e) => {
                  setValue({
                    ...value,
                    startDay: dayjs(e[0]["$d"]).format("DD/MM/YYYY"),
                    endDay: dayjs(e[1]["$d"]).format("DD/MM/YYYY"),
                  });
                  setDatePicker({
                    startDay: dayjs(e[0]["$d"]),
                    endDay: dayjs(e[1]["$d"]),
                  });
                }}
                bordered={false}
                format={dateFormat}
              />
            </Space>
          </Form.Item>
        </div>
        <div className=" mx-8 my-5 ">
          <Form.Item name="location">
            <p className="text-base font-bold">Điểm đến: </p>
            <Input
              defaultValue={getIdPost.location}
              bordered={false}
              placeholder="Điểm đến chuyến đi của bạn"
              onChange={(e) => setValue({ ...value, location: e.target.value })}
            />
          </Form.Item>
          <Form.Item name="tagUser">
            <b className="text-base"> Những người cùng tham gia: </b>
            <div className="pt-3">
              <TagUser data={getIdPost.tagUser} />
            </div>
          </Form.Item>

          {inputTimeline?.map((item, index) => {
            return (
              <Form.Item name="timeline" key={index}>
                <b> Mốc thời gian {index + 1} </b>
                <div className="flex gap-2 justify-around">
                  <DatePicker
                    disabledDate={disabledDate}
                    showTime
                    format={dateFormat}
                    defaultValue={
                      !inputTimeline[index].time
                        ? ""
                        : dayjs(inputTimeline[index]?.time, dateFormat)
                    }
                    className="w-2/5"
                    onChange={(date) => {
                      const value = date.format(dateFormat);
                      setInputTimeline((prevInputTimeline) => {
                        const newInputTimeline = [...prevInputTimeline];
                        newInputTimeline[index] = {
                          ...newInputTimeline[index],
                          time: value,
                        };
                        return newInputTimeline;
                      });
                    }}
                  />
                  <Input
                    placeholder="Điểm đến chuyến đi của bạn"
                    className="w-1/2"
                    value={inputTimeline[index]?.location}
                    onChange={(e) => {
                      const value = e.target.value;
                      setInputTimeline((prevInputTimeline) => {
                        const newInputTimeline = [...prevInputTimeline];
                        newInputTimeline[index] = {
                          ...newInputTimeline[index],
                          location: value,
                        };
                        return newInputTimeline;
                      });
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
              </Form.Item>
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
  );
};

export default UpdatePost;
