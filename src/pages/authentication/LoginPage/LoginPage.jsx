import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../../redux/user/userActions";
import { TOKEN_TYPES } from "../../../utils/constants";
import AuthenAPI from "../../../services/authenAPI";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomErrorMessage from "../../../components/errorMessage/errorMessage";

const LoginValidationSchema = yup.object().shape({
  email: yup.string().email("Email must be a valid email").required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      "Password must contain at least one number and one special character"
    )
    .min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        const response = await AuthenAPI.login(values);
        const accessToken = response.data.accessToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          await dispatch(fetchCurrentUser());
          navigate("/posts");
        }
      } catch (error) {
        setError(error.response.data?.message);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: LoginValidationSchema,
  });

  const { handleSubmit, handleChange, errors } = formik;

  console.log(handleChange);

  if (isAuthenticated) {
    return <Navigate to="/posts" />;
  }
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const onFinish = async (fromValue) => {
  //   try {
  //     const response = await AuthenAPI.login(fromValue);
  //     const accessToken = response.data.accessToken;

  //     if (accessToken) {
  //       localStorage.setItem(TOKEN_TYPES.ACCESS_TOKEN, accessToken);
  //       await dispatch(fetchCurrentUser());
  //       navigate("/posts");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          className="max-w-md mx-auto bg-blue p-5 rounded-md shadow-md "
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            marginTop: "123px",
          }}
        >
          <h2 className="text-2xl font-semibold text-center mb-5">Đăng Nhập</h2>
          {error && <p className="text-red-500 my-4">{error}</p>}

          <form name="registration" onSubmit={handleSubmit}>
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
                  onChange={handleChange}
                />
                {errors.email && <CustomErrorMessage content={errors.email} />}
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
                  onChange={handleChange}
                  label="password"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600"
              >
                Đăng Nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
