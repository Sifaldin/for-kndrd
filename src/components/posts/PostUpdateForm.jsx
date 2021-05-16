import React, { useState } from "react";

export default function PostUpdateForm({ post, updatePost, setIsUpdating }) {
  const [body, setBody] = useState(post.body);
  const [title, setTitle] = useState(post.title);

  return (
    <div>
      <label className="custom-field">
        <textarea
          type="text"
          required
          className="updateText"
          rows="1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="placeholder"></span>
      </label>

      <label className="custom-field">
        <textarea
          type="text"
          required
          className="updateText"
          rows="5"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <span className="placeholder"></span>
      </label>

      <div>
        <button
          type="submit"
          className="medium-button"
          onClick={() => {
            updatePost({ ...post, body, title });
            setIsUpdating(false);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
