import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
const { confirm } = Modal;

const ShowConfirm = () => {
  confirm({
    title: "Xác nhận xoá bài viết:",
    icon: <ExclamationCircleFilled />,
    content: "Bạn chắc chắn muốn xoá bài viết này?",
    okType: "danger",
    okText: "Đồng ý",
    cancelText: "Huỷ bỏ",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

export default ShowConfirm;
