import React, { useState } from "react";
import Api from "../../../api/Api";
import ProfileImageUploader from "./ProfileImageUploader";
import { IoMdCloseCircle } from "react-icons/io";

export default function ImageEditMenu({
  user,
  onUpdateUser,
  onSetShowImageEdit,
}) {
  const [imgUrl, setImgUrl] = useState(user.imageUrl);

  const updateUser = () => {
    const updatedUser = { ...user, imageUrl: imgUrl };
    Api.put("/user", updatedUser).then((res) => onUpdateUser(res.data));
  };

  return (
    <div className="image-menu-wrapper">
      <div className="modal-box">
        <div className="modal-icon">
          <IoMdCloseCircle
            color="lightblue"
            onClick={() => onSetShowImageEdit(false)}
          />
        </div>

        <div className="image-edit-body">
          <img className={"profileImg"} src={imgUrl} />
          <div className={"uploader"}>
            <ProfileImageUploader onSetImgUrl={(data) => setImgUrl(data)} />

            <button
              className="share-btn"
              onClick={() => {
                updateUser();
                onSetShowImageEdit(false);
              }}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
