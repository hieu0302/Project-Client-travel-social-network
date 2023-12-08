import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { signUp } from "../../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const result = await signUp(values);
      navigate("/login");
      toast.success("Đăng kí thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đăng kí thất bại");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <divu
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        gap: "50px",
      }}
    >
      <Card
        style={{
          flex: "1",
          backgroundImage: `url('https://www.shutterstock.com/image-vector/airplane-cloud-blue-passport-luggage-600nw-2305845281.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          maxWidth: "70%",
        }}
      ></Card>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",

          borderRadius: "8px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
          paddingRight: "100px",
        }}
      >
        <div>
          <h1>Trip Treasure</h1>
          <h2>Đăng kí</h2>
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên Họ và tên!" },
              ]}
            >
              <Input
                placeholder="Họ và tên"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ email!" },
                { type: "email", message: "Địa chỉ email không hợp lệ!" },
              ]}
            >
              <Input
                placeholder="Email"
                prefix={<MailOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên Tên đăng kí!" },
              ]}
            >
              <Input
                placeholder="Tên đăng kí"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                placeholder="Mật khẩu"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu xác nhận không khớp!");
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Xác nhận mật khẩu"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          "Bạn phải đồng ý với Điều khoản sử dụng!"
                        ),
                },
              ]}
            >
              <Checkbox>
                Tạo một tài khoản có nghĩa là bạn đồng ý với Điều khoản sử dụng.
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng Ký
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
    </divu>
  );
};

export default SignupPage;
