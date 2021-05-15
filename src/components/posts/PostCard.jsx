import React, { useState } from "react";
import Api from "../../api/Api";
import { Link } from "react-router-dom";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

export default function PostCard({ post }) {
  const [reaction, setReaction] = useState(post.reaction);

  console.log(post);

  const incrementLike = () => {
    const url = "/reactions/" + reaction.id + "?incrementTarget=like";
    Api.put(url, reaction).then((r) => {
      setReaction(r.data);
    });
  };

  const incrementDislike = () => {
    const url = "/reactions/" + reaction.id + "?incrementTarget=dislike";
    Api.put(url, reaction).then((r) => {
      setReaction(r.data);
    });
  };

  return (
    <div className="postcard">
      <Link to={{ pathname: `/posts/${post.id}`, state: { post } }}>
        <img className="post-image" src={post?.imageUrl} alt="" />
      </Link>

      <div className="post-bottom">
        <div className="signature">
          <img
            className="comment-user"
            src={post?.user?.imageUrl}
            alt="Single post"
          />
          <div className="spans">
            <span className="user-name">Posted by {post.user?.name}</span>
            <span className="date">{post?.date}</span>
          </div>
        </div>
        {/* Header includes post title and type(giving or requesting) */}
        <div className="header">
          <h3 className="title">{post.title}</h3>
        </div>
        <p className="post-text">{post.body}</p>

        <div className="down-wrapper">
          <div className="signature"></div>
          <hr />
          {/* React container includes reactions and link to the post details */}
          <div className="react">
            <div className="reaction">
              <button onClick={incrementLike}>
                <FaLongArrowAltUp className="up" />
                <span>{reaction.like}</span>
              </button>
              <button onClick={incrementDislike}>
                <FaLongArrowAltDown className="down" />
                <span>{reaction.dislike}</span>
              </button>
            </div>

            <Link className="medium-button" to={`/posts/${post.id}`}>
              View post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
