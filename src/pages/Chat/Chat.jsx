import BoxMessage from "../../components/ChatRoom/BoxMessage/BoxMessage";
import UserChat from "../../components/ChatRoom/UserChat/UserChat";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";

const ChatBox = () => {
  return (
    <div className="flex mr-7 w-full">
      <div className=" flex gap-5 w-full">
        <UserChat />
        <BoxMessage />
      </div>

      {/* <UserProfileCard /> */}
    </div>
  );

};

export default ChatBox;
