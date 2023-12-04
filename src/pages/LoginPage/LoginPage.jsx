import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh", // Use viewport height
        gap: "100px",
      }}
    >
      <Card
        style={{
          flex: "1",
          backgroundImage: `url('https://www.shutterstock.com/image-vector/airplane-cloud-blue-passport-luggage-600nw-2305845281.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          maxWidth: "64%",
        }}
      ></Card>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "8px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <h1>Trip Treasure</h1>
          <h2>Đăng nhập</h2>
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên người dùng hoặc email!",
                },
              ]}
            >
              <Input placeholder="Tên người dùng hoặc email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng nhập
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <p>Hoặc tiếp tục với:</p>
              <Button type="default" icon={<i className="fab fa-facebook"></i>}>
                Facebook
              </Button>
              <Button type="default" icon={<i className="fab fa-google"></i>}>
                Google
              </Button>
              <Button type="default" icon={<i className="fab fa-google"></i>}>
                Gmail
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
