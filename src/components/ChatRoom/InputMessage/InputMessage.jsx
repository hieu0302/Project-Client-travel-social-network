import { message } from "antd";
import React, { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import MessageAPI from "../../../services/messageApi";
import { useDispatch, useSelector } from "react-redux";
import { chatRoomSliceAction } from "../../../redux/chat/ChatSlice";
import socket from "../../Socket/Soket.js";
import PendingAPI from "../../../services/pendingNotifyAPI.js";

const InputMessage = () => {
  const {
    notyfyMessage,
    pendingMessage,
    chatRoom,
    idRoomChat,
    messagesData,
    infoReceiver,
  } = useSelector((state) => state.chatRoom);

  const { currentUser } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  // const deletePendingNotify = async (idRoomChat) => {
  //   try {
  //     const result = await PendingAPI.deleteByIdRoom(idRoomChat);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleOnEnter = async () => {
    const value = {
      idSender: currentUser._id,
      text: text,
      idRoomChat: idRoomChat,
      avatarSender: currentUser.avatar,
      nameSender: currentUser.username,
    };
    message.info(text);

    try {
      await PendingAPI.deleteByIdRoom(idRoomChat);
      const result = await MessageAPI.createMessage(value);

      if (result.status === 201) {
        console.log("RÉult", result);
        dispatch(
          chatRoomSliceAction.createMessage(result?.data?.newMessageData)
        );
        socket.emit("sendMessage", {
          idSender: currentUser._id,
          text: text,
          idRoomChat: idRoomChat,
          nameSender: currentUser.username,
          idReceiver: infoReceiver.idUser,
          nameReceiver: infoReceiver.name,
          avatarSender: currentUser.avatar,
          createdAt: result?.data?.newMessageData?.createdAt,
        });

        dispatch(chatRoomSliceAction.deleteNotifyNumber(idRoomChat));
      }
      if (notyfyMessage.length !== 0) {
        dispatch(chatRoomSliceAction.deleteNotifyNumber(idRoomChat));
      }
      if (pendingMessage.length !== 0) {
        dispatch(chatRoomSliceAction.deletePendingNumber(idRoomChat));
      }
      dispatch(chatRoomSliceAction.deleteNumberNav(Math.random()));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      // dispatch(chatRoomSliceAction.getNotifyMessage(data.dataSendMessage));
      console.log("DMMMM", data);
    });
  }, [socket]);

  return (
    <div>
      {idRoomChat?.length > 0 && (
        <div>
          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Nhập tin nhắn..."
          />
        </div>
      )}
    </div>
  );
};

export default InputMessage;
