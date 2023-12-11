import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const backgroundImageUrl =
    "https://www.anhngumshoa.com/uploads/images/userfiles/hoatdongngoaikhoa/travel-agency-merchant-account.jpg";

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="container mx-auto mt-10 ">
        <div
          className="max-w-md mx-auto bg-blue p-5 rounded-md shadow-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        >
          <h2 className="text-2xl font-semibold text-center mb-5">Đăng Ký</h2>

          <form name="registration" onSubmit={onFinish}>
            <div className="mb-4">
              <label
                className="block text-black-400 text-sm font-bold mb-2 "
                htmlFor="username"
              >
                Tên người dùng
              </label>
              <div className="flex items-center rounded-full bg-opacity-50 bg-white bg-blur w-full py-2 px-3">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-black-400 mr-2"
                />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Tên người dùng"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-black-400 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex items-center rounded-full bg-opacity-50 bg-white bg-blur w-full py-2 px-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-black-400 mr-2"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-black-400 text-sm font-bold mb-2"
                htmlFor="confirm"
              >
                Mật khẩu
              </label>
              <div className="flex items-center rounded-full bg-opacity-50 bg-white bg-blur w-full py-2 px-3">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-black-400 mr-2"
                />
                <input
                  type="password"
                  id="confirm"
                  name="confirm"
                  placeholder="Mật khẩu"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-black-400 text-sm font-bold mb-2"
                htmlFor="confirm"
              >
                Xác nhận mật khẩu
              </label>
              <div className="flex items-center rounded-full bg-opacity-50 bg-white bg-blur w-full py-2 px-3">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-black-400 mr-2"
                />
                <input
                  type="password"
                  id="confirm"
                  name="confirm"
                  placeholder="Xác nhận mật khẩu"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600"
              >
                Đăng Ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
