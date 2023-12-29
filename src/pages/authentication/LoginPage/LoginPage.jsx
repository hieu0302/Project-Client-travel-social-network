import { LockOutlined, MailOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../../redux/user/userActions";
import { TOKEN_TYPES } from "../../../utils/constants";
import AuthenAPI from "../../../services/authenAPI";
import { Button, Divider, Form, Input, message } from "antd";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (fromValue) => {
    try {
      const response = await AuthenAPI.login(fromValue);
      const accessToken = response.data.accessToken;

      if (accessToken) {
        localStorage.setItem(TOKEN_TYPES.ACCESS_TOKEN, accessToken);
        const infoUser = await dispatch(fetchCurrentUser());
        console.log(infoUser);
        if (response.status == 200) {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              username: infoUser.payload.username,
              idUser: infoUser.payload._id,
              avatar: infoUser.payload.avatar,
            })
          );
          navigate("/");
          message.success("Đăng nhập thành công!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-10 ">
      <div
        className="max-w-md mx-auto bg-blue p-5 rounded-md shadow-md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <div className="flex flex-col gap-4">
          <Form
            name="normal_login"
            className="flex flex-col gap-2"
            onFinish={handleLogin}
          >
            <h1 className="text-gray-800 font-bold text-3xl mb-1">Đăng nhập</h1>
            <p className="text-sm font-normal text-gray-600 mb-4">
              Đăng nhập để trải nghiệm dịch vụ tuyệt vời
            </p>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Hãy điền Email của bạn!" }]}
            >
              <Input
                prefix={<MailOutlined className="mr-2" />}
                type="email"
                placeholder="Email"
                className="h-11"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Hãy điền Mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="mr-2" />}
                type="password"
                placeholder="Nhập mật khẩu"
                className="h-11"
              />
            </Form.Item>

            <Button
              htmlType="submit"
              className="w-full h-11 bg-[#0077ff] text-white font-bold  hover:bg-[#312e81] hover:text-black "
            >
              Đăng nhập
            </Button>
          </Form>

          <p className="mt-2">
            Bạn chưa có tài khoản?{" "}
            <Link to={"/signup"} className="text-blue-400 hover:no-underline">
              Đăng ký
            </Link>
          </p>

          <div className="flex justify-center gap-4">
            <Button className="pt-2 flex flex-col  justify-start items-center gap-2 h-16">
              <FaGoogle size={20} />
              <p>Đăng nhập với Google</p>
            </Button>
            <Button className="pt-2 flex flex-col  justify-start items-center gap-2 h-16">
              <FaFacebook size={23} />
              <p>Đăng nhập với Facebook</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
