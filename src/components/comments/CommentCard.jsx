import React, { useState } from "react";
import CommentUpdateForm from "./CommentUpdateForm";

function CommentCard({
  comment,
  onDeleteComment,
  onSetComments,
  updateComment,
  user,
  comments,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment);

  const deleteComment = () => {
    onDeleteComment();
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
          comments={comments}
          onSetComments={onSetComments}
          comment={comment}
          updateComment={updateComment}
          onSetIsUpdating={(data) => setIsUpdating(data)}
          onSetUpdatedComment={(data) =>
            setUpdatedComment({ ...comment, data })
          }
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
