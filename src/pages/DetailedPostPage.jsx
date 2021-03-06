import { useState, useEffect } from "react";
import Api from "../api/Api";
import MaterialUiCalendar from "../components/Calendar/MaterialUiCalendar";
import { useHistory } from "react-router-dom";
import { BsClock } from "react-icons/bs";
import Comments from "../components/comments/Comments";
import PostUpdateForm from "../components/posts/PostUpdateForm";

export default function DetailedPostPage({
  match,
  onDelete,
  onUpdate,
  user,
  posts,
}) {
  const id = match.params.id;
  const [isUpdating, setIsUpdating] = useState(false);
  const [post, setPost] = useState(posts?.find((post) => post.id == id));
  const [selectedDateAndTime, setSelectedDateAndTime] = useState(
    post?.meetingTimeAndDate
  );

  const history = useHistory();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await Api.get(`/posts/${id}`);
        setPost(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPost();
  }, [id]);

  const updatePost = (updatedPost) => {
    
    Api.put("/posts", updatedPost).then((res) => {
      onUpdate(res.data);
      setPost(res.data);
    });
  };

  const deletePost = () => {
    onDelete(post);
    Api.delete("/posts/" + post.id).then(() => history.push(`/feed`));
  };

  const dateDisplay = () => {
    if (post?.meetingTimeAndDate !== null) {
      return post?.meetingTimeAndDate.slice(0, 10);
    }
  };

  const timeDisplay = () => {
    if (post?.meetingTimeAndDate !== null) {
      return post?.meetingTimeAndDate.slice(16, 21);
    }
  };

  return (
    <div className="single-post">
      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>

      <div className="time-related">
        <div className="show-map date-booking">
          <div className="time-box">
            <div className="event-time">
              <BsClock></BsClock>
              <div>
                <span>
                  {dateDisplay()} at {timeDisplay()}
                </span>
              </div>
            </div>

            {post?.user.id === user?.id && post?.meetingTimeAndDate && (
              <div>
                <MaterialUiCalendar
                  selectedDateAndTime={selectedDateAndTime}
                  onUpdateDate={(data) => setSelectedDateAndTime(data)}
                />
                <button
                  className="medium-button edit"
                  onClick={() => {
                    updatePost({
                      ...post,
                      meetingTimeAndDate: selectedDateAndTime,
                    });
                  }}
                >
                  edit date
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="single-post-card">
        <div className="post-info">
          <div className="signature">
            <img
              className="post-user"
              src={post?.user.imageUrl}
              alt="Single post img"
            />
            <div>
              <span className="user-name">{post?.user.name}</span>
              <span className="date">{post?.date}</span>
            </div>
          </div>

          {isUpdating ? (
            <PostUpdateForm
              post={post}
              updatePost={updatePost}
              onSetisUpdating={(data) => setIsUpdating(data)}
            />
          ) : (
            <>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
            </>
          )}

          {post?.user.email === user?.email && (
            <div className="button-group">
              <button
                className="medium-button"
                onClick={() => setIsUpdating(true)}
              >
                Update
              </button>

              <button className="medium-button pink" onClick={deletePost}>
                Delete
              </button>
            </div>
          )}
        </div>
        <Comments postId={id} user={user} post={post} />
      </div>
    </div>
  );
}
