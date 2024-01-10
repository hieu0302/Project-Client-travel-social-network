import { GoHeart, GoHeartFill } from "react-icons/go";
import LikeAPI from "../../services/likesAPI";
import { message } from "antd";
import { fetchAllLike, fetchAllPostLiked } from "../../redux/likes/likeAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeSliceAction } from "../../redux/likes/LikeSlice";
import { Socket, io } from "socket.io-client";

const Like = (data) => {
  const dispatch = useDispatch();

  //   const { postId } = useSelector((state) => state.posts);
  const { postLiked } = useSelector((state) => state.like);

  const { currentPage, postId, idPost } = data.data || [];
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [data.data.idUser]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", data.data.idUser);
  }, [socket]);

  console.log(data.data.usernameCreate);

  const createLike = async () => {
    const newLike = {
      idPost: data.data.idPost,
      username: data.data.username,
      like: true,
      idUser: data.data.idUser,
      avatar: data.data.avatar,
    };
    try {
      const response = await LikeAPI.createLike(newLike);

      if (response.status == 201) {
        message.success("Đã thích bài viết!");
        socket.emit("sendLike", {
          senderName: data.data.username,
          receiverName: data.data.usernameCreate,
          idReceiver: data.data.idUserCreate,
          idSender: data.data.idUser,
        });
        dispatch(likeSliceAction.createdLike(response.data.newLikeData.idPost));
      }
    } catch (error) {
      console.log(error);
    }
    console.log("PROPS:", data);
  };

  const unLike = async () => {
    try {
      const response = await LikeAPI.deleteLike({
        idPost: data.data.idPost,
        idUser: data.data.idUser,
      });
      dispatch(likeSliceAction.unLike(data.data.idPost));
      if (response.status === 200) {
        message.success("Bỏ thích thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const renderLike = () => {
  //   const result = postLiked.find(
  //     (item) => item.postLiked.idPost == data.data.idPost

  //   );
  //   console.log("result:::::", data.data);
  //   if (result) {
  //     if (result.length == 0) {
  //       return (
  //         <button onClick={createLike}>
  //           <GoHeart size={25} color="red" fontWeight={1} />
  //         </button>
  //       );
  //     } else {
  //       return <p>NO</p>;
  //     }
  //   }
  // };
  const renderLike = () => {
    const foundItem = postLiked.find((item) => item === idPost);
    if (foundItem) {
      return (
        <button onClick={unLike}>
          <GoHeartFill size={25} color="red" fontWeight={1} />
        </button>
      );
    } else {
      return (
        <button onClick={createLike}>
          <GoHeart size={25} color="red" fontWeight={1} />
        </button>
      );
    }

    // if (result) {
    //   if (result.idPost == idPost) {
    //     return (
    //       <button onClick={createLike}>
    //         <GoHeartFill size={25} color="red" fontWeight={1} />
    //       </button>
    //     );
    //   } else {
    //     return (
    //       <button onClick={createLike}>
    //         <GoHeart size={25} color="red" fontWeight={1} />
    //       </button>
    //     );
    //   }
    // }
  };

  return <div>{renderLike()}</div>;
};

export default Like;
