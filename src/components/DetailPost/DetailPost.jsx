import { Carousel, Modal, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { albumSliceAction } from "../../redux/album/albumSlice.js";
import moment from "moment";
import { PiClockClockwise } from "react-icons/pi";
import { useEffect, useState } from "react";
import { fetchCommentByPage } from "../../redux/comments/commentAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { commentSliceAction } from "../../redux/comments/commentSlice";
import { IoLocationOutline } from "react-icons/io5";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";

moment.locale("vi");

const ModalDetailPost = () => {
  const dispatch = useDispatch();
  const { postsData } = useSelector((state) => state.posts);
  const { openModal, idAlbumOpendetail } = useSelector((state) => state.album);
  const { currentUser } = useSelector((state) => state.auth);

  const closeModal = () => {
    dispatch(albumSliceAction.openModal(!openModal));
    dispatch(commentSliceAction.removeCommentData([]));
    dispatch(albumSliceAction.removeIdAlbum([]));
  };

  const detailPost = postsData.filter((i) => i._id === idAlbumOpendetail);
  console.log("DDDD", detailPost);

  return (
    <Modal open={openModal} onCancel={closeModal}>
      <div>
        <b> Chi tiết bài viết: </b>
        <p>{moment(new Date(detailPost[0]?.createdAt)).fromNow()}</p>
        <div>{detailPost[0]?.title}</div>
        <div>
          <img src={detailPost[0]?.image} className=" rounded-lg" />
        </div>
        <div>
          <div>
            <p className=" text-lg flex gap-2 text-shadow-lg ">
              <IoLocationOutline />
              Địa điểm: {detailPost[0]?.location}
            </p>
            <p className="flex gap-3 text-shadow-lg ">
              <MdFlightTakeoff size={20} /> Bắt đầu: {detailPost[0]?.startDay}
            </p>
            <p className="flex gap-3 text-shadow-lg ">
              <MdFlightLand size={20} /> Kết thúc: {detailPost[0]?.endDay}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailPost;
