import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input, Dropdown, Button, message, Modal, Skeleton } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { PiClockClockwise, PiDotsThreeCircle } from "react-icons/pi";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { MdOutlineEditNote, MdDeleteOutline } from "react-icons/md";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  GoHeart,
  GoCommentDiscussion,
  GoShareAndroid,
  GoBookmark,
} from "react-icons/go";
import Dotdotdot from "react-dotdotdot";

import "moment/dist/locale/vi";
import CreateAlbum from "../../layouts/CreateAlbum/CreateAlbum";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAlbum } from "../../redux/album/albumAction";
import AlbumAPI from "../../services/albumAPI";
import { fetchAllComment } from "../../redux/comments/commentAction";
import {
  fetchAllLike,
  fetchAllPostLiked,
  fetchCountLike,
} from "../../redux/likes/likeAction";
import { commentSliceAction } from "../../redux/comments/commentSlice";
import CommentAPI from "../../services/commentAPI";
import Like from "../Like/like";
import ModalUserLiked from "../ModalUserLikePost/Modal.jsx";
import { likeSliceAction } from "../../redux/likes/LikeSlice";
import ListComment from "../comments/comments.jsx";
import { albumSliceAction } from "../../redux/album/albumslice.js";
import ModalDetailAlbum from "../../layouts/DetailAlbum/DetailAlbum.jsx";
import socket from "../Socket/Soket.js";

moment.locale("vi");

const { confirm } = Modal;

const AlbumCard = () => {
  const dispatch = useDispatch();
  const { albumData, pagination, albumId, openModal } = useSelector(
    (state) => state.album
  );
  const { countLike } = useSelector((state) => state.like);
  const [loading, setloading] = useState(true);
  const { currentUser } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const { currentPage, totalPages } = pagination || {};
  const shouldFetchMoreAlbum = currentPage < totalPages;

  useEffect(() => {
    setTimeout(() => {
      const payload = {
        page,
      };
      dispatch(fetchAllAlbum(payload));

      setloading(false);
    }, 1000);
  }, [page]);

  useEffect(() => {
    if (loading == false) {
      albumId.forEach((item) => {
        dispatch(fetchAllComment(item));
        dispatch(fetchCountLike(item));
        dispatch(fetchAllPostLiked({ idUser: currentUser._id, idPost: item }));
      });
    }
  }, [currentPage]);

  const fetchMoreAlbum = () => {
    setPage(currentPage + 1);
  };

  const initialValues = {
    comment: "",
  };

  const [valueComment, setValueComment] = useState(initialValues);

  const createComment = async (item) => {
    const comment = {
      ...valueComment,
      idPost: item._id,
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
        if (currentUser.userId !== item.userId) {
          socket.emit("sendComment", {
            senderName: currentUser.username,
            idSender: currentUser._id,
            receivername: item.username,
            titlePost: item.title,
            idReceiver: item.userId,
            idPost: item._id,
            ...valueComment,
          });
        }
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
          dispatch(albumSliceAction.deleteAlbum(id));
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
      await AlbumAPI.deleteByID(id);
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

  const countLikeRender = (item) => {
    const result = countLike.find((i) => i.idPost == item);
    console.log("ITEM::::", result);

    if (result) {
      if (result.countLike.length == 0) {
        return <b>0 lượt yêu thích</b>;
      } else {
        return (
          <button onClick={() => openModalUserLiked(item)}>
            <b className="flex gap-1">
              <div>{result.countLike} lượt yêu thích</div>
            </b>
          </button>
        );
      }
    }
  };

  const openModalDetail = (id) => {
    dispatch(albumSliceAction.openModal(!openModal));
    dispatch(albumSliceAction.idAlbumOpenDetail(id));
  };

  return (
    <div className=" ml-10 flex flex-col items-center gap-5 w-2/3">
      <div>
        <CreateAlbum />
      </div>
      <span className=" w-650 mx-10 ">
        {loading && !currentPage && (
          <Skeleton active avatar paragraph={{ rows: 3 }} />
        )}
      </span>
      <InfiniteScroll
        loader={<Skeleton active avatar paragraph={{ rows: 3 }} />}
        dataLength={albumData.length}
        next={fetchMoreAlbum}
        hasMore={shouldFetchMoreAlbum}
      >
        {albumData.map((item, index) => (
          <div
            key={index}
            className=" bg-white w-650 border-solid  mb-10 mx-10 p-5 rounded-lg shadow-xl"
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
                    Album đã được khởi tạo từ{" "}
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
            <div className="pt-3 pl-3">
              <button className="text-xl font-bold">{item.title}</button>
            </div>
            <div className="mt-5  rounded-xl grid grid-cols-2 grid-rows-2 gap-2 ">
              <button
                onClick={() => openModalDetail(item._id)}
                className=" col-span-1 row-span-2"
              >
                <img
                  className=" h-full w-full object-cover rounded-xl border  "
                  src={item.image[0]}
                />
              </button>
              <button className=" col-span-1">
                <img
                  className=" h-32 w-full object-cover rounded-xl border  "
                  src={item.image[1]}
                />
              </button>

              <button className=" relative col-span-1 ">
                {item.image.length > 3 && (
                  <div className=" absolute text-center rounded-xl w-full h-full bg-gray-400 bg-opacity-60 top-1/2 left-1/2 text-4xl translate-x-a translate-y-a">
                    <div className="w-full h-full flex items-center justify-center">
                      <b>{item.image.length - 3} + </b>
                    </div>
                  </div>
                )}

                <img
                  className=" h-32 w-full object-cover rounded-xl border  "
                  src={item.image[2]}
                />
              </button>
            </div>
            <div className=" pl-5 pt-5  font-bold w-full ">
              <p className=" text-lg flex gap-2 items-center w-full">
                <IoLocationOutline />
                Địa điểm: {item.location}
              </p>
            </div>
            <div className="flex  pt-3 pl-5">
              <Dotdotdot clamp={3} truncationChar=" ...Đọc thêm...">
                <p>
                  <b className="w-full">{item.username}: </b>
                  {item.description}
                </p>
              </Dotdotdot>
            </div>

            <div className="flex justify-between p-3">
              <div className="flex gap-5 ">
                <Like
                  data={{
                    idPost: item._id,
                    username: currentUser.username,
                    currentPage: pagination.currentPage,
                    albumId: albumId,
                    idUser: currentUser._id,
                    avatar: currentUser.avatar,
                    idUserCreate: item.userId,
                    usernameCreate: item.username,
                    titlePost: item.title,
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
                onClick={() => createComment(item)}
                className=" p-2 rounded-2xl text-blue-700 hover:bg-slate-100"
              >
                Đăng
              </button>
            </div>
          </div>
        ))}
      </InfiniteScroll>
      <ModalUserLiked />
      <ModalDetailAlbum />
      {currentPage == totalPages && currentPage !== undefined && (
        <div className=" pb-5">
          <b>Bạn đã xem toàn bộ Album!</b>
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
