import { useEffect, useMemo, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Upload, Spin } from "antd";
import UploadImageAPI from "../../../services/uploadAPI";
import { useSelector } from "react-redux";
import Dragger from "antd/es/upload/Dragger";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = ({ setUrl }) => {
  const { urlImage, openModal } = useSelector((state) => state.posts);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  //   const { activePage, isEditingPage } = useSelector((state) => state.page);
  //   const { currentUser, openEditProfile } = useSelector((state) => state.user);
  useEffect(() => {
    if (openModal && urlImage) {
      setFileList([{ url: urlImage[0] }]);
      console.log("File", urlImage);
    }
  }, [urlImage]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleUploadImage = async (info) => {
    if (info.file.status === "removed") return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", info.file);

    try {
      const res = await UploadImageAPI.uploadImage(formData);
      if (res.data.url) {
        setUrl(res.data.url);
        handleChange(info);
        setUrl([res.data.url]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    handleChange({ fileList: [] });
    setUrl([]);
  };

  const uploadButton = useMemo(
    () => (
      <div>
        {!uploading && (
          <>
            <UploadOutlined style={{ fontSize: "20px" }} />
            <div className="mt-2">
              Kéo thả hoặc chọn flie ảnh nền cho chuyến đi
            </div>
          </>
        )}
        {uploading && (
          <>
            <Spin />
            <div className="mt-2">Đang tải ảnh lên</div>
          </>
        )}
      </div>
    ),
    [uploading]
  );

  return (
    <>
      <Dragger
        accept=".png,.jpg,.jpeg,.webp"
        listType="picture"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleUploadImage}
        maxCount={1}
        onRemove={handleRemoveImage}
        beforeUpload={(file) => {
          return new Promise((resolve, reject) => {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (isLt2M) {
              reject("File size exceeded");
            } else {
              resolve("Success");
            }
          });
        }}
      >
        {fileList?.length >= 2 ? null : uploadButton}
      </Dragger>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
export default UploadImage;
