import { Navigate, useNavigate } from "react-router-dom";
import AuthenAPI from "../../../services/authenAPI";
import { Button, Checkbox, Form, Input, InputNumber, message } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import UploadAvatar from "./UploadAvatar/uploadAvatar";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();

  const [cloudinaryUrl, setCloudinaryUrl] = useState([]);

  const handleSignup = async (formValue) => {
    const { isAgreed, ...signupValue } = formValue;
    const newValue = { avatar: cloudinaryUrl.avatar[0], ...signupValue };

    if (!isAgreed) return;
    try {
      const response = await AuthenAPI.signup(newValue);
      if (response.status == 200) {
        navigate("/login");
        message.success("Đăng nhập thành công!");
      }
     
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto py-3 ">
      <div
        className="max-w-md mx-auto bg-blue p-5 rounded-md shadow-md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <Form
          name="normal_login"
          className="flex flex-col gap-2"
          onFinish={handleSignup}
        >
          <h1 className="text-gray-800 font-bold text-3xl mb-1">Đăng ký</h1>
          <p className="text-sm font-normal text-gray-600 mb-4">
            Tạo tài khoản để chia sẻ những chuyến đi của bạn!
          </p>

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Hãy nhập tên của bạn!" }]}
          >
            <Input
              prefix={<UserOutlined className="mr-2" />}
              placeholder="Tên của bạn"
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
          >
            <Input
              prefix={<MailOutlined className="mr-2" />}
              placeholder="Email"
              className="h-11"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "Hãy nhập số điện thoại của bạn!" },
            ]}
          >
            <InputNumber
              controls={false}
              prefix={<MobileOutlined className="mr-2" />}
              placeholder="Số điện thoại"
              className="flex items-center h-11 w-full"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Hãy điền mật khẩu!" },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()._-])[A-Za-z\d@$!%*#?&^()._-]{8,24}$/,
                message:
                  "Dài 8-24, chứa đủ chữ thường, chữ hoa, ký tự đặc biệt",
              },
            ]}
            validateDebounce={600}
          >
            <Input.Password
              prefix={<LockOutlined className="mr-2" />}
              type="password"
              placeholder="Mật khẩu"
              className="h-11"
            />
          </Form.Item>
          <Form.Item>
            <p className=" font-bold"> Tải lên Avatar của bạn: </p>
            <div className=" text-center">
              <UploadAvatar
                setUrl={(link) =>
                  setCloudinaryUrl({ ...cloudinaryUrl, avatar: link })
                }
              />
            </div>
          </Form.Item>

          <Form.Item name="isAgreed" valuePropName="checked" noStyle>
            <Checkbox>
              Tôi đã đọc và đồng ý Điều khoản và chính sách sử dụng
            </Checkbox>
          </Form.Item>

          <Button
            className="w-full h-11 bg-[#0077ff] text-white font-bold  hover:bg-[#312e81] hover:text-black "
            htmlType="submit"
          >
            Đăng ký
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;

{
  /* <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
      }}
    ></div> */
}
