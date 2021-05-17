import React, { useState } from "react";

function CommentUpdateForm({
  comment,
  updateComment,
  onSetIsUpdating,
  onSetUpdatedComment,
  onSetComments,
  comments,
}) {
  const [body, setBody] = useState(comment.body);

  return (
    <div className="comment-area">
      <textarea
        placeholder="type your comment here.."
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <button
        className="medium-button"
        onClick={() => {
          onSetComments({ ...comments, comment });
          onSetUpdatedComment(body);
          updateComment({ ...comment, body });
          onSetIsUpdating(false);
        }}
      >
        Save
      </button>
    </div>
  );
}

export default CommentUpdateForm;
