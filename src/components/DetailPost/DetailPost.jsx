import { Button, Carousel, Modal, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { albumSliceAction } from "../../redux/album/albumslice";
import moment from "moment";
import { PiClockClockwise } from "react-icons/pi";
import { useEffect, useState } from "react";
import { fetchCommentByPage } from "../../redux/comments/commentAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { commentSliceAction } from "../../redux/comments/commentSlice";
import { IoLocationOutline } from "react-icons/io5";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import RenderTagUser from "../RenderTagUser/RendertagUser";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { BiLocationPlus } from "react-icons/bi";
import "react-vertical-timeline-component/style.min.css";

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

  const ReactVerticalTimelineComponent = () => {
    return (
      <VerticalTimeline layout="1-column-left">
        {detailPost[0]?.timeline?.map((data) => (
          <VerticalElement data={data} />
        ))}
      </VerticalTimeline>
    );
  };
  const VerticalElement = ({ data }) => {
    return (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        style={{ height: "30px" }}
        contentStyle={{
          background: "#38BDF8",
          color: "black",
          height: "70px",
          borderRadius: "8px",
        }}
        contentArrowStyle={{
          borderRight: "5px solid  rgb(33, 150, 243)",
        }}
        iconStyle={{
          font: "20px",
          background: "#38BDF8",
          color: "#fff",
        }}
        icon={<BiLocationPlus />}
      >
        <div className=" relative">
          <div className="flex gap-3">
            <b className="vertical-timeline-element-subtitle">{data.time}:</b>
            <h3 className="vertical-timeline-element-title">{data.location}</h3>
          </div>
          <button className="absolute w-28 right-1 bg-sky-200 p-1 rounded-md hover:bg-slate-100 duration-500 ">
            Lượt checkin: 0
          </button>
        </div>
      </VerticalTimelineElement>
    );
  };

  return (
    <Modal open={openModal} onCancel={closeModal}>
      <div>
        <b className=" text-lg"> Chi tiết chuyến đi: </b>

        <div className="flex items-center gap-5 pt-3">
          <div className=" flex justify-center items-center h-14 w-14 bg-gradient-to-r from-indigo-600 to-blue-300  rounded-full">
            <img
              src={detailPost[0]?.avatar}
              className=" h-12 w-12 rounded-full border-2 border-white"
            />
          </div>
          <div>
            <p className=" font-extrabold font-nunito text-lg">
              {detailPost[0]?.username}
            </p>
            <p className=" flex gap-3 text-gray-500">
              <PiClockClockwise size={20} color="red" />
              Chuyến đi đã được khởi tạo từ{" "}
              {moment(new Date(detailPost[0]?.createdAt)).fromNow()}
            </p>
          </div>
        </div>

        <div>
          <div className="mt-5 relative">
            <div className="w-full ">
              <img
                className=" w-full h-64 object-cover rounded-xl border "
                src={detailPost[0]?.image[0]}
              />
            </div>

            <div className=" text-white  font-bold absolute bottom-5 left-5 drop-shadow-2xl">
              <div className="text-2xl ">
                <p className=" text-shadow-lg shadow-black">
                  {detailPost[0]?.title}
                </p>
              </div>
              <p className=" text-lg flex gap-2 text-shadow-lg shadow-black">
                <IoLocationOutline />
                Địa điểm: {detailPost[0]?.location}
              </p>
              <p className="flex gap-3 text-shadow-lg shadow-black">
                <MdFlightTakeoff size={20} /> Bắt đầu: {detailPost[0]?.startDay}
              </p>
              <p className="flex gap-3 text-shadow-lg shadow-black">
                <MdFlightLand size={20} /> Kết thúc: {detailPost[0]?.endDay}
              </p>
            </div>
          </div>

          {detailPost[0]?.tagUser && detailPost[0]?.tagUser?.length !== 0 && (
            <div className="px-2">
              <b>Những người cùng tham gia:</b>
              <div className="flex w-full gap-2 flex-wrap">
                {detailPost[0]?.tagUser?.map((id) => (
                  <RenderTagUser data={id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {detailPost[0]?.timeline && detailPost[0]?.timeline[0]?.time && (
        <div className="mx-2 mt-3">
          <b className=" text-base">Các mốc thời gian:</b>
          {ReactVerticalTimelineComponent()}
        </div>
      )}
    </Modal>
  );
};

export default ModalDetailPost;
