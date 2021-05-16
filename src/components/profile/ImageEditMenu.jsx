import React, { useState } from "react";
import Api from "../../api/Api";
import ProfileImageUploader from "./ProfileImageUploader";
import { IoMdCloseCircle } from "react-icons/io";

export default function ImageEditMenu({ user, setUser, setShowImageEdit }) {
  const [imgUrl, setImgUrl] = useState(user.imageUrl);

  //Callback function that will send a user update call to the server
  const updateUser = () => {
    const updatedUser = { ...user, imageUrl: imgUrl };
    Api.put("/user", updatedUser).then((res) => setUser(res.data));
  };

  return (
    <div className="image-menu-wrapper">

      <div className="modal-box">
        <div className="modal-icon">
          <IoMdCloseCircle
            color="lightblue"
            onClick={() => setShowImageEdit(false)}
          />
        </div>

        <div className="image-edit-body">
          <img className={"profileImg"} src={imgUrl} />
          <div className={"uploader"}>
            <ProfileImageUploader setImgUrl={setImgUrl} />

            <button
              className="share-btn"
              onClick={() => {
                updateUser();
                setShowImageEdit(false);
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
