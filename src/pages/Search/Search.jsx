import React, { useState } from "react";
import { Button, Drawer, Radio, Space, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { notifySliceAction } from "../../redux/Notification/NotificationSilce";
import UserAPI from "../../services/userAPI";
import { debounce } from "lodash";
import PostsAPI from "../../services/postsAPI";
import { albumSliceAction } from "../../redux/album/albumSlice";
import ModalDetailPost from "../../components/DetailPost/DetailPost";
import { postSliceAction } from "../../redux/posts/postSlice";

const { Search } = Input;
const SearchBox = () => {
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(true);
  const { openModal } = useSelector((state) => state.album);
  const { openSearch } = useSelector((state) => state.notify);
  const [searchUser, setSearchUser] = useState([]);
  const dispatch = useDispatch();
  const showDrawer = () => {
    setOpen(true);
  };

  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setSearchUser([]);
    setValue1(value);
  };

  const onClose = () => {
    dispatch(notifySliceAction.openSearch(false));
    setSearchUser([]);
    setOpen(false);
  };

  const openModalDetail = (item) => {
    dispatch(albumSliceAction.openModal(!openModal));
    dispatch(albumSliceAction.idAlbumOpenDetail(item._id));
    dispatch(postSliceAction.detailPost(item));
    console.log("ID", item);
  };

  const options = [
    {
      label: "Mọi người",
      value: true,
    },
    {
      label: "  Bài viết",
      value: false,
    },
  ];
  const onChange = debounce(async (e) => {
    try {
      if (!value1) {
        const result = await PostsAPI.getPostsBySearch(e.target.value);

        setSearchUser(result.data.data);
        return;
      } else {
        const result = await UserAPI.getInfoUserBySearch(e.target.value);
        setSearchUser(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, 500);

  console.log("Search::", searchUser);

  return (
    <>
      <ModalDetailPost />
      <Drawer
        title="Tìm Kiếm:"
        placement={"left"}
        width={500}
        onClose={onClose}
        open={openSearch}
        styles={{ body: { padding: "0px" } }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <div className=" sticky top-0 py-3 bg-white">
          <div className="text-center pb-5">
            <Radio.Group
              value={value1}
              onChange={onChange1}
              options={options}
              optionType="button"
            />
          </div>
          <div className=" text-center ">
            <Search
              placeholder="Nhập tìm kiếm..."
              allowClear
              onChange={onChange}
              size="large"
              style={{
                width: 400,
              }}
            />
          </div>
        </div>
        {!value1 ? (
          <div className="m-5">
            {searchUser.length > 0 && (
              <b className=" text-lg ml-12">Bài viết: </b>
            )}
            {searchUser.map((item) => (
              <div
                onClick={() => openModalDetail(item)}
                className=" flex items-center gap-3 my-5 mx-12 hover:cursor-pointer"
              >
                <img
                  src={item?.image[0]}
                  className=" h-20 w-20 rounded-md object-cover"
                />
                <div className="flex flex-col">
                  <b className=" text-base">{item.title}</b>
                  <b> Điểm đến: {item.location} </b>
                  <p className=" text-slate-500">
                    {item.startDay} - {item.endDay}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="m-5">
            {searchUser.length > 0 && (
              <b className=" text-lg ml-12">Người dùng: </b>
            )}
            {searchUser.map((item, index) => (
              <div className="flex items-center gap-3 my-5 mx-12" key={index}>
                <img src={item.avatar} className="h-10 w-10 rounded-full" />
                <div>{item.username}</div>
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </>
  );
};
export default SearchBox;
