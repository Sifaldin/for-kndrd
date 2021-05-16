import PostCard from "../components/posts/PostCard";

export default function Feed({ posts }) {
  return (
    <div className="posts-page">
      <div className="posts">
        {posts.length === 0 || posts === undefined ? (
          <h1 className="empty-feed">Your feed looks empty, start posting!</h1>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
