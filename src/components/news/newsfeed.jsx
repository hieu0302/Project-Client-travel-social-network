import React, { useEffect, useState } from "react";
import {  Modal } from "antd";;
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../postItem/postItem.jsx";
;
import CreatePost from "../../layouts/createPost/createPost";

import { fetchAllPosts } from "../../redux/posts/postActions.js";
import moment from "moment";
import "moment/dist/locale/vi";

moment.locale("vi");

const { confirm } = Modal;

const News = () => {
  const { postsData } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.auth);
  const [reloadPosts, setReloadPosts] = useState(null);
  const dispatch = useDispatch();

  const handleChildButtonClick = (randomValue) => {
    setReloadPosts(randomValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchAllPosts());
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [reloadPosts]);
  return (
    <div className="flex flex-col items-center gap-5 ">
    <div>
      <CreatePost onChildButtonClick={handleChildButtonClick} />
    </div>
    {postsData.map((item, index) => (
      <PostItem 
      key={index}
      props={item}
      currentUser={currentUser} // Truyền currentUser xuống PostItem
      />
    ))}
  </div>
  );
};

export default News;
