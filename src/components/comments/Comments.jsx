import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import Api from "../../api/Api";

export default function Comments({ postId, user, post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAllComments = () => {
      Api.get("/comments").then((res) => setComments(res.data));
    };
    getAllComments();
  }, []);

  const createComment = (commentData) => {
    Api.post(`/comments`, commentData).then((response) => {
      setComments([...comments, response.data]);
    });
  };

  const updateComment = (updatedComment) => {
    Api.put("/comments", updatedComment).then((res) => {
      let mappedComments = comments?.map((comment) =>
        comment.id !== updatedComment?.id ? comment : res.data
      );
      setComments(mappedComments);
    });
  };

  return (
    <div className="comments-wrapper">
      <h3>Comments</h3>

      {comments?.length > 0 ? (
        <div className="comments">
          {comments
            .filter((comment) => comment.post?.id == postId)
            .map((comment) => (
              <CommentCard
                comments={comments}
                onSetComments={(data) => setComments(data)}
                user={user}
                comment={comment}
                key={comment.id}
                updateComment={updateComment}
                onDeleteComment={() =>
                  setComments(comments.filter((c) => c.id !== comment.id))
                }
                comments={comments}
              />
            ))}
        </div>
      ) : (
        <p className="no-comments">No one commented this post yet</p>
      )}
      <CommentForm user={user} onSubmit={createComment} post={post} />
    </div>
  );
}
