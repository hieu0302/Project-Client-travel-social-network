import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useDispatch, useSelector } from "react-redux";
import {  fetchPostSaved } from "../../redux/posts/postActions.js";

const SavedPosts = ({ userId }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.auth);
  const { postsData } = useSelector((state) => state.posts);
  const [isSaved, setIsSaved] = useState(false)
  const [reloadPosts, setReloadPosts] = useState(null);

  const dispatch = useDispatch()

  const handleChildButtonClick = (randomValue) => {
    setReloadPosts(randomValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchPostSaved());
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [reloadPosts]);


  return (
    <div>
      <h1>Saved Posts</h1>
      {postsData.map((item, index) => (
      <ul>
       
          <li key={index}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </li>
       
      </ul>
      ))}
    </div>
  );
};

export default SavedPosts;
