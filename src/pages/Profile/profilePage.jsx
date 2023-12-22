import React, { useState, useEffect } from 'react';
import PostsAPI from "../../services/postsAPI.js";
import { useDispatch, useSelector } from "react-redux";
import PostItem from '../../components/postItem/postItem';
import UploadAvatar from "../authentication/SignupPage/UploadAvatar/uploadAvatar";
import {  fetchPostByUser } from '../../redux/posts/postActions';

const profilePage = () => {
  const { postsData } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.auth);  
  const [reloadPosts, setReloadPosts] = useState(null);
  const dispatch = useDispatch();



  const handleChildButtonClick = (randomValue) => {
    setReloadPosts(randomValue);
  };

  // Đếm tổng số bài viết từ danh sách đã lấy được
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchPostByUser());
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const totalPosts = postsData.length
  

  return (
    <div className=" w-full ">
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <main className=" w-full ">
        {/* <Navbar className="" /> */}
        <section className="relative block h-500-px ">
          <div
            className=" absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://tripsocial.vn/_next/image?url=https%3A%2F%2Fgopavel.com%2Fimages%2Ftripart%2F2.jpg&w=1080&q=75",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
            <label
              htmlFor="upload"
              className="bottom-0 right-0 my-4 mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2  rounded-full absolute     cursor-pointer"
            >
              <input id="upload" type="file" className="hidden" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="24"
                height="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6z" />
              </svg>
            </label>
          </div>
        </section>

        <section className="relative py-16 bg-blueGray-200 ">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative ">
                    <img
                    alt="..."
                    src={currentUser.avatar}
                    className="bg-gray-200 shadow-xl h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px rounded-full"
                    style={{ width: '150px', height: '150px' }} 
                  />

                      <label
                        htmlFor="upload"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full absolute bottom-0 left-0 m-2 cursor-pointer"
                      >
                        <input id="upload" type="file" className="hidden" />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          width="24"
                          height="24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6z" />
                        </svg>
                      </label>
                      {/* <UploadAvatar
              setUrl={(link) =>
                setCloudinaryUrl({ ...cloudinaryUrl, avatar: link })
              }
            /> */}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Chỉnh Sửa Thông Tin
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          0
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Following
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          0
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Follower
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          0
                        </span>
                        <span className="text-sm text-blueGray-400">Ablum</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {totalPosts}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Checkin
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700  ">
                    {currentUser.username}
                  </h3>

                  <div className="flex ml-0 pl-0 ">
                    <div className="w-1/3 text-left mt-10">
                      <div className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                        Giới thiệu
                      </div>
                      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                        Los Angeles, California
                      </div>
                      <div className="mb-2  text-blueGray-600  ">
                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                        Solution Manager - Creative
                      </div>
                      <div className="mb-2 text-blueGray-600 ">
                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                        University of Computer Science
                      </div>

                      <div className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 ">

                      </div>
                    </div>

                    <div className=" w-2/3 text-blueGray-600 mt-10 mb-10">

                    {postsData.map((item, index) => (
      <PostItem 
      key={index}
      props={item}
      currentUser={currentUser} // Truyền currentUser xuống PostItem
     
    
                   
      />
    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default profilePage;
