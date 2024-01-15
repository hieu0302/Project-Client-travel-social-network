import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useDispatch, useSelector } from "react-redux";
import {  fetchPostSaved } from "../../redux/posts/postActions.js";
import PostItem from '../../components/postItem/postItem.jsx';
import CreatePost from '../../layouts/createPost/createPost.jsx';
import SearchBox from '../../components/search/search.jsx';
const SavedPosts = ({ userId }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { postsData } = useSelector((state) => state.posts);
  const [reloadPosts, setReloadPosts] = useState(null);

  const dispatch = useDispatch();

  const handleChildButtonClick = (randomValue) => {
    setReloadPosts(randomValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchPostSaved());
      } catch (error) {
        console.log("Error fetching saved posts: ", error);
      }
    };

    fetchData();
  }, [reloadPosts]);

  return (
    <div className="flex w-full">
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

    <SearchBox />
  </div>
  
  );
};

export default SavedPosts;
