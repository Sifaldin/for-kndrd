import React, { useState } from "react";

function CommentUpdateForm({
  oldComment,
  updateComment,
  setIsUpdating,
  setUpdatedComment,
}) {
  const [body, setBody] = useState(oldComment.body);

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
          updateComment({ ...oldComment, body });
          setIsUpdating(false);
          setUpdatedComment({...oldComment, body})
        }}
      >
        Save
      </button>
    </div>
  );
}

export default CommentUpdateForm;
