import React, { useState } from "react";
import { format } from "date-fns";

export default function CommentForm({ user, onSubmit, post }) {
  const [body, setBody] = useState("");

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
          onSubmit({
            body,
            user,
            post,
            date: format(new Date(), "dd-MM-yyyy"),
          });
          setBody("");
        }}
      >
        Comment
      </button>
    </div>
  );
}
