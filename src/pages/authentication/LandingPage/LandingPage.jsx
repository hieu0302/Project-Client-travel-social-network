// src/components/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <header className="bg-white-500 p-4 flex justify-between items-center px-10">
        <div>
          <img
            className="w-41"
            src="/src/assets/Trip-removebg-preview.png"
            alt="Logo"
          />
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300">
              Đăng Nhập
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300">
              Đăng Ký
            </button>
          </Link>
        </div>
      </header>
      <main className="py-12 md:px-20 sm:px-14 px-6">
        <div className="sm:flex items-center shadow-md">
          <div className="w-1/2 md:px-10 sm:px-5">
            <h1 className="text-gray-800 font-bold text-2xl my-2">
              Trip Social
            </h1>
            <p className="text-gray-700 mb-2 md:mb-6 text-3xl">
              Mạng xã hội du lịch tuyệt vời, nơi bạn chia sẻ trải nghiệm, lập kế
              hoạch, và kết nối với cộng đồng đam mê du lịch. Khám phá thế giới
              mới và tạo những kỉ niệm đáng nhớ cùng chúng tôi!
            </p>
            <div className="flex justify-between mb-2"></div>
          </div>
          <div className="w-1/2">
            <img
              className="w-full h-full object-cover"
              src="https://media.tapchitaichinh.vn/images/upload/tranhuyentrang/08232019/du-lich.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="mt-6 md:flex space-x-6">
          <div>
            <img
              className="w-full h-48 object-cover"
              src="https://bcp.cdnchinhphu.vn/344443456812359680/2022/12/27/nhattrang3-16721128389061596602579.jpg"
              alt=""
            />
            <div>
              <h1 className="mt-3 text-gray-800 text-2xl font-bold my-2">
                Nha Trang
              </h1>
              <p className="text-gray-700 mb-2">
                Biển Nha Trang là điểm đến biển nổi tiếng với bãi cát trắng và
                nước biển trong xanh. Đây là địa điểm lý tưởng cho du khách muốn
                thư giãn và tham gia các hoạt động như lướt sóng, đua thuyền, và
                lặn biển.
              </p>
              <div className="flex justify-between mt-4">
                <span className="font-thin text-sm">May 13th 2023</span>
                <span className="mb-2 text-gray-800 font-bold">Read more</span>
              </div>
            </div>
          </div>
          <div>
            <img
              className="w-full h-48 object-cover"
              src="https://ik.imagekit.io/tvlk/blog/2022/10/kinh-nghiem-du-lich-hon-son-kien-giang-5.jpg?tr=dpr-2,w-675"
              alt=""
            />
            <div>
              <h1 className="mt-3 text-gray-800 text-2xl font-bold my-2">
                đảo Hòn Sơn
              </h1>
              <p className="text-gray-700 mb-2">
                Đảo Hòn Sơn thuộc quần đảo Nam Du, Kiên Giang, Việt Nam. Nổi
                tiếng với bãi cát trắng, nước biển trong xanh, và động Ba Làng,
                nơi thu hút du khách bởi vẻ đẹp tự nhiên và không gian yên bình.
              </p>
              <div className="flex justify-between mt-4">
                <span className="font-thin text-sm">May 25th 2020</span>
                <span className="mb-2 text-gray-800 font-bold">Read more</span>
              </div>
            </div>
          </div>
          <div>
            <img
              className="w-full h-48 object-cover"
              src="https://media.baoquangninh.vn/dataimages/201702/original/images912506_1.jpg"
              alt=""
            />
            <div>
              <h1 className="mt-3 text-gray-800 text-2xl font-bold my-2">
                Đảo Ngọc
              </h1>
              <p className="text-gray-700 mb-2">
                Đảo Ngọc ở Phú Quốc thường chỉ là tên gọi thân mật cho Hòn Ngọc,
                nổi tiếng với bãi cát trắng và nước biển xanh trong, là điểm đến
                tuyệt vời cho thư giãn và trải nghiệm thiên nhiên.
              </p>
              <div className="flex justify-between mt-4">
                <span className="font-thin text-sm">May 7th 2022</span>
                <span className="mb-2 text-gray-800 font-bold">Read more</span>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </main>
    </div>
  );
}

export default LandingPage;
