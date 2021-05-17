import { format } from "date-fns";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Api from "../../api/Api";
import ImageUploader from "./ImageUploader";
import MaterialUiCalendar from "../Calendar/MaterialUiCalendar";

function PostForm({ posts, setPosts, user }) {
  const history = useHistory();
  const [imgUrl, setImgUrl] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [details, setDetails] = useState("");

  /* calendar related hook */
  const now = new Date().toString();
  const [selectedDateAndTime, setSelectedDateAndTime] = useState(now);

  const canBeSubmitted = () => {
    return (
      imgUrl !== undefined &&
      imgUrl.length > 0 &&
      postTitle.length > 0 &&
      details.length > 0
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newPost = {
      body: details,
      imageUrl: imgUrl,
      title: postTitle,
      date: format(new Date(), "dd-MM-yyyy"),
      user: user,
      meetingTimeAndDate: selectedDateAndTime,
    };

    Api.post("/posts", newPost).then((res) => {
      setPosts([...posts, res.data]);
      history.push(`/feed`);
    });
  };

  return (
    <div className="create-container">
      <form className="createcard" onSubmit={submitHandler}>
        <div className="card-body">
          <div className="page-title">
            <h1>Share Your Plans!</h1>
          </div>
          <ImageUploader setImgUrl={setImgUrl} />

          <label className="custom-field">
            <input
              type="text"
              required
              className={`${postTitle.length > 0 ? "card-input" : "waitInput"}`}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <span className="placeholder">Enter Title </span>
          </label>

          <label className="custom-field">
            <textarea
              type="text"
              required
              className={`${details.length > 0 ? "card-input" : "waitInput"}`}
              rows="10"
              onChange={(e) => setDetails(e.target.value)}
            />
            <span className="placeholder">Enter Details</span>
          </label>

          <MaterialUiCalendar
            selectedDateAndTime={selectedDateAndTime}
            setSelectedDateAndTime={setSelectedDateAndTime}
          />

          <div>
            <button
              className="medium-button"
              disabled={!canBeSubmitted() ? true : false}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
