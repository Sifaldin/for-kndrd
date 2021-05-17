import React, { useState } from "react";
import CommentUpdateForm from "./CommentUpdateForm";

function CommentCard({ comment, setComments, comments, updateComment, user }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment);

  const deleteComment = () => {
    setComments(comments.filter((c) => c.id !== comment.id));
    Api.delete(`/comments/${comment.id}`);
  };

  return (
    <div className="comment-card">
      <div className="signature">
        <img
          className="comment-user"
          src={comment.user?.imageUrl}
          alt="Comment author img"
        />
        <div>
          <span className="user-name">{comment.user?.name}</span>
          <span className="date">{comment.date}</span>
        </div>
      </div>

      {isUpdating ? (
        <CommentUpdateForm
          oldComment={comment}
          updateComment={updateComment}
          setIsUpdating={setIsUpdating}
          setUpdatedComment={setUpdatedComment}
        />
      ) : (
        <p>{updatedComment.body}</p>
      )}

      {comment.user.name === user.name ? (
        <div className="button-group">
          <button className="medium-button" onClick={() => setIsUpdating(true)}>
            Update
          </button>

          <button className="medium-button pink" onClick={deleteComment}>
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentCard;
