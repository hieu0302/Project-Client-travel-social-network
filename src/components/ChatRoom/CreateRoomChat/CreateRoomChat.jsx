import { Button, Modal, message } from "antd";
import TagUser from "../../TagUser/TagUser";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSliceAction } from "../../../redux/posts/postSlice";
import { FaUserFriends } from "react-icons/fa";
import UserAPI from "../../../services/userAPI";
import ChatRoomAPI from "../../../services/chatRoomAPI";
import { result } from "lodash";
import { chatRoomSliceAction } from "../../../redux/chat/ChatSlice";

const CreateRoomChat = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { chatRoom } = useSelector((state) => state.chatRoom);
  const { tagUser } = useSelector((state) => state.posts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState([]);
  //   const [idSelected, setIdSelected] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModalOpen == true) {
      const idSelected = chatRoom.some((e) =>
        e.member.some((member) => member.idUser === tagUser)
      );

      if (
        // tagUser.length !== 0 ||
        currentUser._id !== tagUser &&
        !idSelected
      ) {
        const getInfoUser = async () => {
          try {
            const result = await UserAPI.getOne(tagUser);
            console.log("KKKK", result);
            if (result.status === 200) {
              setValue({
                member: [
                  {
                    name: currentUser.username,
                    idUser: currentUser._id,
                    avatar: currentUser.avatar,
                  },
                  {
                    name: result.data.data.username,
                    idUser: result.data.data._id,
                    avatar: result.data.data.avatar,
                  },
                ],
              });
            }
          } catch (error) {
            console.log(error);
          }
        };
        getInfoUser();
      } else {
        setValue([]);
        return message.error("Tài khoản này đã được thêm");
      }
    }
  }, [tagUser]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (value.length !== 0) {
      try {
        const result = await ChatRoomAPI.createChatRoom(value);
        if (result.status == 201) {
          dispatch(
            chatRoomSliceAction.createRoomChat(result?.data?.newChatRoomData)
          );
          message.success("Tạo phòng chat thành công");
          setIsModalOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("Phòng chat này đã tồn tại");
      setIsModalOpen(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(postSliceAction.tagUserSave([]));
    console.log(`selected `, tagUser);
  };
  return (
    <div>
      <Button onClick={showModal}>Thêm +</Button>
      <Modal
        title="Tạo một cuộc trò chuyện mới:"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button disabled={tagUser.length == 0} onClick={handleOk}>
            Thêm
          </Button>,

          <Button danger onClick={handleCancel}>
            Huỷ bỏ
          </Button>,
        ]}
      >
        <div>
          <span className="flex items-center gap-3">
            <span>
              <FaUserFriends />
            </span>
            <b>Thêm người dùng vào cuộc trò chuyện:</b>
          </span>
          <div className="border border-solid rounded-lg w-52 m-5 ">
            <TagUser data={"Select"} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateRoomChat;
