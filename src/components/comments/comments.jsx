import PostsAPI from "../../services/postsAPI.js";
import { commentSliceAction } from "../../redux/comments/commentSlice.js";
import { fetchAllComment } from "../../redux/comments/commentAction.js";
import CommentAPI from "../../services/commentAPI.js";
import { useDispatch, useSelector } from "react-redux";
import { EllipsisOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import moment from "moment";

moment.locale("vi");

const ListComment = (props) => {
  const { commentData } = useSelector((state) => state.comment);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // console.log(commentData);

  const quantityComment = commentData.filter(
    (comments) => comments.idPost === props.idPost
  );

  const dataCommentFilter = quantityComment.slice(-3);

  const handleDelete = async (id) => {
    try {
      await CommentAPI.deleteComment(id);
      dispatch(commentSliceAction.deleteComment(id));
      message.success("Đã xoá bình luận");
    } catch (err) {
      console.log(err);
    }
  };

  const confirm = (id) => {
    console.log(id);
    handleDelete(id);
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <div>
      <p className="px-4 font-bold">{quantityComment.length} bình luận</p>
      {dataCommentFilter.map((comment, commentIndex) => (
        <div className="flex  items-center">
          <div key={commentIndex} className="flex gap-3 items-center px-5">
            <img src={comment.avatar} className="w-10 h-10 rounded-full" />
            <div className=" bg-gray-100 p-2 m-1 rounded-xl text-sm">
              <div className="flex gap-4 items-center">
                <b>{comment.userComment} .</b>
                <p className=" text-xs font-thin">
                  {moment(new Date(comment.createdAt)).fromNow()}
                </p>
              </div>
              <p>{comment.comment}</p>
            </div>
          </div>
          {comment.userId == currentUser._id ? (
            <Popconfirm
              title="Xoá bình luận"
              description="Bạn chắc chắn muốn xoá bình luận này?"
              onConfirm={() => confirm(comment._id)}
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
          ) : null}
        </div>
      ))}
    </div>
  );
};
export default ListComment;

{
  /* // commentData.filter((comment) => comment.idPost === item._id)
// .map((comment, commentIndex) => (
//   <div>
//     <img src={comment.avatar} className="w-10 h-10" />
//     <b>{comment.userComment}</b>

//     <p key={commentIndex}>{comment.comment}</p>
//   </div> */
}
