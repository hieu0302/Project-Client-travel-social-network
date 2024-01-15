import { useEffect } from "react";
import News from "../../components/news/newsfeed";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard.jsx";
import NavBar from "../../layouts/NavBar/navbar";
import socket from "../../components/Socket/Soket.js";

const NewsFeed = () => {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const IdUser = JSON.parse(userInfo);

    if (IdUser) {
      socket?.emit("addNewUser", IdUser?.idUser);
    }
  }, [socket]);

  return (
    <div className="flex w-full">
      <News />

      <UserProfileCard />
    </div>
  );
};

export default NewsFeed;
