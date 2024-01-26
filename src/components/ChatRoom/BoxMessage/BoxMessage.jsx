import { useDispatch, useSelector } from "react-redux";
import InputMessage from "../InputMessage/InputMessage";
import { useEffect, useRef } from "react";
import { fetchAllMessages } from "../../../redux/chat/ChatAction";
import { Empty } from "antd";
import moment from "moment";
import { chatRoomSliceAction } from "../../../redux/chat/ChatSlice.js";

moment.locale("vi");

const BoxMessage = () => {
  const { chatRoom, idRoomChat, messagesData, notyfyMessage } = useSelector(
    (state) => state.chatRoom
  );
  const bottomRef = useRef(null);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (idRoomChat) {
      dispatch(fetchAllMessages({ idRoomChat: idRoomChat }));
    }
  }, [idRoomChat]);

  useEffect(() => {
    const idRoomChatNotify = notyfyMessage.filter(
      (item) => item.idRoomChat === idRoomChat
    );

    if (idRoomChatNotify.length !== 0) {
      idRoomChatNotify.map((item) => {
        dispatch(chatRoomSliceAction.createMessage(item));
      });
    }
  }, [notyfyMessage]);

  useEffect(() => {
    bottomRef.current.scrollIntoView();
  }, [messagesData]);

  return (
    <div className=" w-2/3 bg-white my-10 rounded-lg shadow-lg">
      <div className=" m-5 h-[32rem] bg-slate-200 overflow-auto rounded-lg shadow-lg">
        <ul className="flex flex-col-reverse ">
          {messagesData.length === 0 ? (
            <div className=" pt-32">
              {idRoomChat.length > 0 ? (
                <Empty description="Không có tin nhắn" />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Lựa chọn đoạn chat của bạn"
                />
              )}
            </div>
          ) : (
            messagesData?.map((item, index) => (
              <div key={index}>
                <li
                  className={
                    currentUser._id === item?.idSender
                      ? "flex justify-end ml-28 p-3 "
                      : "flex  justify-start mr-28 p-3"
                  }
                >
                  <div
                    className={
                      currentUser._id === item?.idSender
                        ? "flex flex-col gap-2 items-end"
                        : "flex flex-col items-start gap-2"
                    }
                  >
                    <div
                      className={
                        currentUser._id === item?.idSender
                          ? "flex items-end  gap-3 px-4 py-2 rounded-lg flex-row-reverse text-gray-700  bg-white border border-gray-200 shadow-md "
                          : "flex items-end gap-3 bg-blue-600  text-white  px-4 py-2 rounded-lg shadow-md "
                      }
                    >
                      <img
                        src={item?.avatarSender}
                        className="h-7 w-7 rounded-full"
                      />
                      <div>
                        <p>{item?.text}</p>
                      </div>
                    </div>
                    <div className=" text-xs">
                      {moment(new Date(item?.createdAt)).fromNow()}
                    </div>
                  </div>
                </li>
              </div>
            ))
          )}
        </ul>
        <div ref={bottomRef} />
      </div>
      <div>
        <InputMessage />
      </div>
    </div>
  );
};

export default BoxMessage;
