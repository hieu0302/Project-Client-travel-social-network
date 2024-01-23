import React, { useEffect, useState } from "react";
import UserAPI from "../../services/userAPI";

const RenderTagUser = (item) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await UserAPI.getOne(item.data);

        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [item]);

  return (
    <button className="flex  items-center  gap-2 bg-slate-200 p-2 rounded-lg shadow-md">
      <img src={data?.data?.data.avatar} className="w-6 h-6 rounded-full" />
      <div>{data?.data?.data?.username}</div>
    </button>
  );
};

export default RenderTagUser;
