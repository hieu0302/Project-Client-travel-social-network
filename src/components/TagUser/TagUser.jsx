import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
import { Input, Tag, theme, Select, Space } from "antd";
import { debounce } from "lodash";
import UserAPI from "../../services/userAPI";
import { useDispatch } from "react-redux";
import { postSliceAction } from "../../redux/posts/postSlice";

const { Option } = Select;

const onSearch = (value) => {
  console.log("search:", value);
};

const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const TagUser = (data) => {
  const [option, setOption] = useState([]);
  const [selected, setSelected] = useState([]);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
 

  useEffect(() => {
    searchUser(data);
  }, [data]);

  console.log("OKKKK", data);

  const handleChange = (value) => {
    dispatch(postSliceAction.tagUserSave(value));
  };

  const selectMode = data?.data === "Select" ? "default" : "multiple";

  const searchUser = debounce(async (value) => {
    try {
      const result = await UserAPI.getInfoUserBySearch(value);

      setOption(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }, 300);

  const change = (value) => {
    searchUser(value);
  };

  return (
    <>
      <Select
        defaultValue={data.data}
        mode={selectMode}
        ref={inputRef}
        bordered={false}
        style={{ width: 200 }}
        placeholder="Thêm người tham gia..."
        onChange={handleChange}
        showSearch
        optionLabelProp="label"
        onSearch={change}
        optionFilterProp="children"
        filterOption={filterOption}
      >
        {option.map((item, index) => (
          <Option key={index} value={item._id} label={item.username}>
            <div className="flex gap-3">
              <img src={item.avatar} className="w-6 h-6 rounded-full" />
              {item.username}
            </div>
          </Option>
        ))}
      </Select>
    </>
  );
};
export default TagUser;
