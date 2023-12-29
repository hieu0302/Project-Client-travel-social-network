import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input, Dropdown, Space, Button, message, Modal, Skeleton } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { PiClockClockwise, PiDotsThreeCircle } from "react-icons/pi";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  MdFlightTakeoff,
  MdFlightLand,
  MdOutlineEditNote,
  MdDeleteOutline,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import EmojiPicker from "emoji-picker-react";
import {
  GoHeart,
  GoCommentDiscussion,
  GoShareAndroid,
  GoBookmark,
} from "react-icons/go";
import CreatePost from "../../layouts/createPost/createPost";
import PostsAPI from "../../services/postsAPI.js";
import UserAPI from "../../services/userAPI.js";
import { fetchAllPosts } from "../../redux/posts/postActions.js";
import moment from "moment";
import "moment/dist/locale/vi";
import { postSliceAction } from "../../redux/posts/postSlice.js";
import { fetchAllComment } from "../../redux/comments/commentAction.js";
import CommentAPI from "../../services/commentAPI.js";
import ListComment from "../comments/comments.jsx";
import { commentSliceAction } from "../../redux/comments/commentSlice.js";
import Like from "../Like/like.jsx";
import {
  fetchAllLike,
  fetchAllPostLiked,
  fetchCountLike,
} from "../../redux/likes/likeAction.js";
import { likeSliceAction } from "../../redux/likes/LikeSlice.js";
import ModalUserLiked from "../ModalUserLikePost/Modal.jsx";

moment.locale("vi");

const { confirm } = Modal;

const News = () => {
  const { postsData, pagination, postId } = useSelector((state) => state.posts);

  const { countLike } = useSelector((state) => state.like);

  const [loading, setloading] = useState(true);

  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const [openModalUserLike, setOpenModalUserLike] = useState("");

  const { currentPage, totalPages } = pagination || {};

  const shouldFetchMorePost = currentPage < totalPages;

  useEffect(() => {
    setTimeout(() => {
      const payload = {
        page,
      };
      dispatch(fetchAllPosts(payload));
      setloading(false);
    }, 1000);
  }, [page]);

  useEffect(() => {
    if (loading == false) {
      postId.forEach((item) => {
        dispatch(fetchAllComment(item));
        dispatch(fetchCountLike(item));
        dispatch(fetchAllPostLiked({ idUser: currentUser._id, idPost: item }));
      });
    }
  }, [currentPage]);

  const fetchMorePosts = () => {
    setPage(currentPage + 1);
  };

  const initialValues = {
    comment: "",
  };

  const [valueComment, setValueComment] = useState(initialValues);

  const createComment = async (id) => {
    const comment = {
      ...valueComment,
      idPost: id,
      userComment: currentUser.username,
      avatar: currentUser.avatar,
      userId: currentUser._id,
    };

    try {
      const response = await CommentAPI.createComent(comment);

      if (response.status == 201) {
        message.success("Bình luận thành công!");
        dispatch(commentSliceAction.createComment(response.data.comment));
        setValueComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ShowConfirm = (id) => {
    confirm({
      title: "Xác nhận xoá bài viết:",
      icon: <ExclamationCircleFilled />,
      content: "Bạn chắc chắn muốn xoá bài viết này?",
      okType: "danger",
      okText: "Đồng ý",
      cancelText: "Huỷ bỏ",
      async onOk() {
        try {
          const result = await handleDelete(id);
          dispatch(postSliceAction.deletePost(id));
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleClick = (key, id) => {
    console.log(id);
    console.log(key);
    if (key == 1) {
      ShowConfirm(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await PostsAPI.deleteByID(id);
      message.success("Đã xoá bài viết");
    } catch (err) {
      console.log(err);
    }
  };

  const items = [
    {
      icon: <MdOutlineEditNote size={20} />,
      label: `Chỉnh sửa`,
      key: "0",
    },
    {
      icon: <MdDeleteOutline size={20} />,
      label: "Xoá bài viết",
      key: "1",
      danger: true,
    },
  ];

  const openModalUserLiked = (item) => {
    dispatch(likeSliceAction.opneModal(true));
    dispatch(fetchAllLike(item));
  };

  console.log("jfadskfhdksjf", openModalUserLike);

  const countLikeRender = (item) => {
    console.log("ITEM::::", item);
    const result = countLike.find((i) => i.idPost == item);
    if (result) {
      if (result.countLike.length == 0) {
        return <b>0 lượt yêu thích</b>;
      } else {
        return (
          <button onClick={() => openModalUserLiked(item)}>
            <b>{result.countLike} lượt yêu thích</b>
          </button>
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-2/3 mb-6">
      <div>
        <CreatePost />
      </div>
      <span className="w-600  ">
        {loading && !currentPage && (
          <Skeleton active avatar paragraph={{ rows: 3 }} />
        )}
      </span>
      <InfiniteScroll
        loader={<Skeleton active avatar paragraph={{ rows: 3 }} />}
        dataLength={postsData.length}
        next={fetchMorePosts}
        hasMore={shouldFetchMorePost}
      >
        {postsData.map((item, index) => (
          <div
            key={index}
            className=" bg-white w-700 border-solid border-2 mb-3 p-5 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className=" flex justify-center items-center h-14 w-14 bg-gradient-to-r from-indigo-600 to-blue-300  rounded-full">
                  <img
                    src={item.avatar}
                    className=" h-12 w-12 rounded-full border-2 border-white"
                  />
                </div>
                <div>
                  <p className=" font-extrabold font-nunito text-lg">
                    {item.username}
                  </p>
                  <p className=" flex gap-3 text-gray-500">
                    <PiClockClockwise size={20} color="red" />
                    Chuyến đi đã được khởi tạo từ{" "}
                    {moment(new Date(item.createdAt)).fromNow()}
                  </p>
                </div>
              </div>
              <div>
                {currentUser._id === item.userId ? (
                  <Dropdown
                    menu={{
                      items,
                      onClick: (e) => handleClick(e.key, item._id),
                    }}
                    trigger={["click"]}
                  >
                    <Button type="link" className=" text-black">
                      <PiDotsThreeCircle size={25} />
                    </Button>
                  </Dropdown>
                ) : null}
              </div>
            </div>
            <div className="mt-5 relative">
              <img
                className=" w-full h-96 object-cover rounded-xl border "
                src={item.image[0]}
              />
              <div className=" text-white  font-bold absolute bottom-10 left-5 drop-shadow-2xl">
                <button className="text-4xl">{item.title}</button>
                <p className="text-xl flex gap-2">
                  <IoLocationOutline />
                  Địa điểm: {item.location}
                </p>
                <p className="flex gap-3">
                  <MdFlightTakeoff size={20} /> Bắt đầu: {item.startDay}
                </p>
                <p className="flex gap-3">
                  <MdFlightLand size={20} /> Kết thúc: {item.endDay}
                </p>
              </div>
            </div>
            <div className="flex justify-between p-3">
              <div className="flex gap-5 ">
                <Like
                  data={{
                    idPost: item._id,
                    username: currentUser.username,
                    currentPage: pagination.currentPage,
                    postId: postId,
                    idUser: currentUser._id,
                    avatar: currentUser.avatar,
                  }}
                />
                <button>
                  <GoCommentDiscussion size={25} />
                </button>
                <button>
                  <GoShareAndroid size={25} />
                </button>
              </div>
              <button>
                <GoBookmark size={25} color="orange" />
              </button>
            </div>
            <div className=" px-4">{countLikeRender(item._id)}</div>
            <ModalUserLiked />
            <ListComment idPost={item._id} />
            <div className="px-2 flex">
              <Input
                theme="light"
                size="large"
                placeholder="Thêm bình luận..."
                bordered={false}
                value={valueComment.comment}
                onChange={(e) => {
                  setValueComment({ comment: e.target.value });
                }}
              />

              <button
                onClick={() => createComment(item._id)}
                className=" p-2 rounded-2xl text-blue-700 hover:bg-slate-100"
              >
                Đăng
              </button>
            </div>
          </div>
        ))}
      </InfiniteScroll>
      {currentPage == totalPages && currentPage !== undefined && (
        <b>Bạn đã xem toàn bộ bài Post!</b>
      )}
    </div>
  );
};

export default News;
