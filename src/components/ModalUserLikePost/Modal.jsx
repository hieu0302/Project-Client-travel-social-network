import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { likeSliceAction } from "../../redux/likes/LikeSlice";

const ModalUserLiked = () => {
  const dispatch = useDispatch();

  const { openModal, likeData, isLoading } = useSelector((state) => state.like);
  console.log("lodfdasfdsa5634563:::", isLoading);

  //   useEffect(() => {
  //     dispatch(likeSliceAction.opneModal());
  //   }, []);

  const handleCancel = () => {
    dispatch(likeSliceAction.opneModal(false));
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Những người đã thích bài viết:"
        open={openModal}
        footer={[<Button onClick={handleCancel}>Ok</Button>]}
      >
        {isLoading
          ? null
          : likeData.map((item) => {
              return (
                <div className="flex items-center gap-5 p-3">
                  <img className="w-10 h-10 rounded-full" src={item.avatar} />
                  <b>{item.username}</b>
                </div>
              );
            })}
      </Modal>
    </>
  );
};
export default ModalUserLiked;
