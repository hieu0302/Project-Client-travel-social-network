import { useDispatch, useSelector } from "react-redux";
import CreateRoomChat from "../CreateRoomChat/CreateRoomChat";
import { useEffect } from "react";
import { fetchAllChatRoom } from "../../../redux/chat/ChatAction";
import { Badge, Button, Popconfirm, message } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ChatRoomAPI from "../../../services/chatRoomAPI";
import { chatRoomSliceAction } from "../../../redux/chat/ChatSlice";
import { Empty } from "antd";
import PendingAPI from "../../../services/pendingNotifyAPI";
import socket from "../../Socket/Soket";

const UserChat = () => {
  const { chatRoom, idRoomChat, notyfyMessage, pendingMessage } = useSelector(
    (state) => state.chatRoom
  );
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  console.log("XXXXX", pendingMessage);

  const handleDelete = async (id) => {
    try {
      const response = await ChatRoomAPI.deleteChatRoom(id);
      if (response.status == 200) {
        message.success("Đã xoá phòng chat");
        dispatch(chatRoomSliceAction.deleteRoomChat(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePendingNotify = async (idRoomChat) => {
    try {
      const result = await PendingAPI.deleteByIdRoom(idRoomChat);
    } catch (error) {
      console.log(error);
    }
  };

  const confirm = (id) => {
    console.log(id);
    handleDelete(id);
  };
  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };
  console.log("ABCD___", notyfyMessage.length !== 0);

  const selectedRoomChat = (id) => {
    const getReceiver = chatRoom
      .find((item) => item?._id === id)
      ?.member.find((i) => i?.idUser !== currentUser._id);
    dispatch(chatRoomSliceAction.deleteNumberNav(Math.random()));

    dispatch(chatRoomSliceAction.getIdRoomChat(id));
    dispatch(chatRoomSliceAction.getReceiver(getReceiver));
    deletePendingNotify(id);
    if (pendingMessage.length) {
      dispatch(chatRoomSliceAction.deletePendingNumber(id));
      console.log("RUN");
    }
    if (notyfyMessage.length !== 0) {
      dispatch(chatRoomSliceAction.deleteNotifyNumber(id));
    }
    // if (pendingMessage[0].length !== 0) {
    //   dispatch(chatRoomSliceAction.deletePendingNumber(id));
    // }
  };

  useEffect(() => {
    dispatch(fetchAllChatRoom({ idUser: currentUser._id }));
  }, [currentUser]);

  return (
    <div className="mx-7 py-10 w-72 h-screen">
      <ul className=" overflow-auto h-full shadow-lg rounded-md  bg-white">
        <div className="m-5 flex items-center justify-between">
          <b>Tin nhắn</b>
          <CreateRoomChat />
        </div>
        {chatRoom.length == 0 ? (
          <div>
            <Empty description="Không có đoạn chat" />
          </div>
        ) : (
          chatRoom.map((item) => {
            return (
              <li
                onClick={() => selectedRoomChat(item._id)}
                key={item._id}
                className={
                  item._id === idRoomChat
                    ? " border border-solid  m-4 p-2 rounded-lg shadow-lg bg-slate-200"
                    : " border border-solid  m-4 p-2 rounded-lg shadow-lg"
                }
              >
                {item.member.map(
                  (i) =>
                    i.idUser !== currentUser._id && (
                      <div
                        className={"flex justify-between hover:cursor-pointer"}
                      >
                        <div
                          className={
                            "flex items-center gap-3 hover:cursor-pointer "
                          }
                        >
                          <Badge
                            count={
                              (pendingMessage
                                ? pendingMessage?.filter(
                                    (e) => e?.idRoomChat === item._id
                                  ).length
                                : 0) +
                              (notyfyMessage?.filter(
                                (e) => e.idRoomChat === item._id
                              )?.length || 0)
                            }
                          >
                            <img
                              className=" h-10 w-10 rounded-full"
                              src={i.avatar}
                            />
                          </Badge>
                          <p>{i.name}</p>
                        </div>
                        <Popconfirm
                          title="Xoá :"
                          description="Bạn chắc chắn muốn xoá phòng chat này?"
                          onConfirm={() => confirm(item._id)}
                          onCancel={cancel}
                          okType="danger"
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            shape="circle"
                            type="text"
                            icon={<EllipsisOutlined />}
                          ></Button>
                        </Popconfirm>
                      </div>
                    )
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default UserChat;
