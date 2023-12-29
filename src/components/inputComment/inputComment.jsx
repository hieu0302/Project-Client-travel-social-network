import { Input } from "antd";
import { useSelector } from "react-redux";
import PostsAPI from "../../services/postsAPI.js";
import { useState } from "react";

const InputComment = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const initialValues = {
    comment: "",
  };

  const [valueComment, setValueComment] = useState(initialValues);

  const createComment = async (id) => {
    const comment = {
      ...valueComment,
      id: id,
      userComment: currentUser.username,
      avatar: currentUser.avatar,
      userId: currentUser._id,
    };

    try {
      const response = await PostsAPI.createComent(comment);

      if (response.status == 201) {
        message.success("Bình luận thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Input
        size="large"
        placeholder="Thêm bình luận..."
        bordered={false}
        onChange={(e) => {
          setValueComment({ comment: e.target.value });
        }}
      />

      {/* <button
        onClick={() => createComment(item._id)}
        className=" p-2 rounded-2xl text-blue-700 hover:bg-slate-100"
      >
        Đăng
      </button> */}
    </>
  );
};

export default InputComment;
