import React, { useEffect, useState } from "react";
import ReactImageUploadComponent from "react-images-upload";

function ImageUploader({ onSetImageUrl }) {
  const [payload, setPayload] = useState(null);

  const updateImage = (event) => {
    var file = event[0];
    var data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "teamphoenix");
    setPayload(data);
  };

  useEffect(() => {
    const abortFetch = new AbortController();
    const sendImage = async () => {
      try {
        if (payload !== null) {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dvmod9mrk/image/upload",
            {
              method: "post",
              body: payload,
              signal: abortFetch.signal,
            }
          );
          const jsonResponse = await response.json();
          onSetImageUrl(jsonResponse["secure_url"]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    sendImage();
    return () => abortFetch.abort();
  }, [payload]);

  return (
    <div className="">
      <ReactImageUploadComponent
        singleImage={true}
        onChange={updateImage}
        buttonText="Upload Image"
        withPreview={true}
        withLabel={false}
        withIcon={false}
        buttonStyles={{ background: "#1e6fbf", borderRadius: "8px" }}
        buttonClassName="upload-button"
        fileContainerStyle={{ boxShadow: "none" }}
      />
    </div>
  );
}

export default ImageUploader;
