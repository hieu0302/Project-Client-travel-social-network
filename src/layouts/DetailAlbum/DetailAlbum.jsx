import { Carousel, Modal, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { albumSliceAction } from "../../redux/album/albumslice";
import moment from "moment";
import { PiClockClockwise } from "react-icons/pi";
import { useEffect, useState } from "react";
import { fetchCommentByPage } from "../../redux/comments/commentAction";
import InfiniteScroll from "react-infinite-scroller";
import { commentSliceAction } from "../../redux/comments/commentSlice";
import { AiOutlineComment } from "react-icons/ai";

moment.locale("vi");

const ModalDetailAlbum = () => {
  const dispatch = useDispatch();
  const { albumData, openModal, idAlbumOpendetail } = useSelector(
    (state) => state.album
  );

  const { commentDataByPage, pagination } = useSelector(
    (state) => state.comment
  );
  const [page, setPage] = useState(1);
  const { commentData } = useSelector((state) => state.comment);
  const { currentUser } = useSelector((state) => state.auth);
  const { currentPage, totalPages, totalComment } = pagination || {};
  const shouldFetchMoreComment = currentPage < totalPages;
  const closeModal = () => {
    setPage(1);
    dispatch(albumSliceAction.openModal(!openModal));
    dispatch(commentSliceAction.removeCommentData([]));
    dispatch(albumSliceAction.removeIdAlbum([]));
  };
  const detailAlbum = albumData.filter(
    (item) => item._id === idAlbumOpendetail
  );

  useEffect(() => {
    if (idAlbumOpendetail.length !== 0) {
      const payload = {
        page: page,
        idPost: idAlbumOpendetail,
      };
      dispatch(fetchCommentByPage(payload));
    }
  }, [page, idAlbumOpendetail]);

  const fetchMoreComment = () => {
    setTimeout(() => {
      setPage(currentPage + 1);
    }, 1000);
  };

  return (
    <Modal
      title={`Album: ${detailAlbum[0]?.title}`}
      open={openModal}
      onCancel={closeModal}
      width={1100}
    >
      <div className="flex gap-10">
        <div className="w-600">
          <Carousel autoplay>
            {detailAlbum[0]?.image.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item} className="h-500 object-cover rounded-xl" />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div>
          <div className="flex gap-3 items-center mb-5">
            <img
              src={detailAlbum[0]?.avatar}
              className="h-14 w-14 rounded-full"
            />
            <div>
              <b className=" text-base">{detailAlbum[0]?.username}</b>
              <p className=" flex gap-3 text-gray-500">
                <PiClockClockwise size={20} color="red" />
                {moment(new Date(detailAlbum[0]?.createdAt)).fromNow()}
              </p>
            </div>
          </div>

          <div
            // id="scrollableDiv"
            className=" h-96 overflow-auto no-scrollbar flex flex-col"
          >
            <div>
              <b className=" text-base">{detailAlbum[0]?.username}</b>{" "}
              {detailAlbum[0]?.description}
            </div>
            <div className="flex items-center gap-3">
              <AiOutlineComment size={20} />
              <b> {totalComment} bình luận</b>
            </div>

            <InfiniteScroll
              loader={<Skeleton active avatar paragraph={{ rows: 1 }} />}
              pageStart={1}
              loadMore={fetchMoreComment}
              hasMore={currentPage < totalPages}
              useWindow={false}
            >
              {commentDataByPage.map((comment, commentIndex) => {
                return (
                  <div key={commentIndex} className="flex  items-center ">
                    <div className="flex gap-3 items-center ">
                      <img
                        src={comment.avatar}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className=" w-80 overflow-auto bg-gray-100 p-3 m-2 rounded-xl">
                        <div className="flex items-center justify-between">
                          <b>{comment.userComment}</b>
                          <div className=" text-xs">
                            {moment(new Date(comment.createdAt)).fromNow()}
                          </div>
                        </div>
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailAlbum;
