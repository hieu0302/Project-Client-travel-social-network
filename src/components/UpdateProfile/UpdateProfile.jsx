
import { Navigate, useNavigate } from "react-router-dom";
import AuthenAPI from "../../services/authenAPI";
import { Button, Checkbox, Form, Input, InputNumber, message } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  MobileOutlined,
  BankOutlined,
  EnvironmentOutlined,
  CarryOutOutlined,

} from "@ant-design/icons";
import UploadAvatar from "../../pages/authentication/SignupPage/UploadAvatar/uploadAvatar";
import React, { useState, useEffect } from "react";
import UserAPI from "../../services/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../redux/user/userActions";

const UpdateProfile = ({ hideUpdateProfile }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [reloadPosts, setReloadPosts] = useState(null);
  const [editedProfile, setEditedProfile] = useState({
    username: currentUser.username,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    from: currentUser.from,
    workIn: currentUser.workIn,
    studyIn: currentUser.studyIn,
    avatar: currentUser.avatar,
    coverImage: currentUser.coverImage,
  });
  const [cloudinaryUrl, setCloudinaryUrl] = useState({ avatar: "", coverImage: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedProfile({
      username: currentUser.username,
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber,
      from: currentUser.from,
      workIn: currentUser.workIn,
      studyIn: currentUser.studyIn,
      avatar: currentUser.avatar,
      coverImage: currentUser.coverImage,
    });
    setCloudinaryUrl({ ...cloudinaryUrl, avatar: currentUser.avatar, coverImage: currentUser.coverImage });
  }, [currentUser]);
  const navigate = useNavigate();
  const handleUpdate = async (value) => {
    try {
      const updatedData = {
        username: value.username,
        email: value.email,
        phoneNumber: value.phoneNumber,
        from: value.from,
        workIn: value.workIn,
        studyIn: value.studyIn,
        avatar: cloudinaryUrl.avatar,
        coverImage: cloudinaryUrl.coverImage,
      };
      await UserAPI.update(updatedData);
      dispatch(fetchCurrentUser());
      message.success("Đã cập nhật thông tin");
      hideUpdateProfile();
    } catch (error) {
      console.error(error);
      message.error("Đã xảy ra lỗi khi cập nhật thông tin");
    }
  };
  const handleClose = () => {
    hideUpdateProfile()
  };
  return (
    <>
      <div className="container mx-auto mt-10 ">
        <div
          className="max-w-md mx-auto bg-blue p-5 rounded-md shadow-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <Form
            name="update"
            className="flex flex-col gap-2"
            onFinish={handleUpdate}
          >
            <div className="flex justify-between">
              <h1 className="text-gray-800 font-bold text-3xl mb-1">Chỉnh Sửa Thông Tin</h1>
              <button onClick={handleClose} className="text-red-600 font-bold text-xl mb-1">X</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Cột bên trái */}
              <div className="col-span-1">
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Hãy nhập tên của bạn!" }]}
                  initialValue={currentUser.username}
                >
                  <Input
                    prefix={<UserOutlined className="mr-2" />}
                    className="h-11"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Hãy điền Email của bạn!" },
                    { type: "email", message: "Nhập chính xác địa chỉ email" },
                  ]}
                  validateDebounce={600}
                  initialValue={currentUser.email}

                >
                  <Input
                    prefix={<MailOutlined className="mr-2" />}
                    className="h-11"
                  />
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Hãy nhập số điện thoại của bạn!" },
                  ]}
                  initialValue={currentUser.phoneNumber}

                >

                  <Input
                    controls={false}
                    prefix={<MobileOutlined className="mr-2" />}
                    placeholder="Số điện thoại"
                    className="flex items-center h-11 w-full"
                    type="string"

                  />
                </Form.Item>
                <Form.Item
                  name="avatar"
                >
                  <p className=" font-bold"> Tải lên Avatar của bạn: </p>
                  <UploadAvatar
                    currentImage={cloudinaryUrl.avatar}
                    setUrl={(link) =>
                      setCloudinaryUrl({ ...cloudinaryUrl,avatar: link?.length ? link?.[0] : "" })
                    }
                  />
                </Form.Item>
              </div>

              {/* Cột bên phải */}
              <div className="col-span-1">
                <Form.Item
                  name="from"
                  initialValue={currentUser.from}
                >
                  <Input
                    controls={false}
                    prefix={<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>}
                    placeholder="From"
                    className="flex items-center h-11 w-full"
                  />
                </Form.Item>

                <Form.Item
                  name="workIn"
                  initialValue={currentUser.workIn}
                >
                  <Input
                    controls={false}
                    prefix={<i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>}
                    placeholder="Work In"
                    className="flex items-center h-11 w-full"
                  />
                </Form.Item>

                <Form.Item
                  name="studyIn"
                  initialValue={currentUser.studyIn}
                >

                  <Input
                    controls={false}
                    prefix={<i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    }
                    placeholder="Study In"
                    className="flex items-center h-11 w-full"

                  />
                </Form.Item>

                <Form.Item
                  name="coverImage"
                >
                  <p className=" font-bold"> Tải lên trang bìa của bạn: </p>
                  <UploadAvatar
                    currentImage={cloudinaryUrl.coverImage}
                    setUrl={(link) =>
                      setCloudinaryUrl({  ...cloudinaryUrl, coverImage: link?.length ? link?.[0] : "" })
                    }
                  />
                </Form.Item>
              </div>
            </div>



            <Button
              className="h-11 bg-blue-500 active:bg-blue-600 text-white font-bold   "
              htmlType="submit"
              onClick={handleUpdate}

            >
              Cập Nhật
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile
