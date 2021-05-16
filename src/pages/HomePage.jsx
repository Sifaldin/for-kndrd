import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hike from "../assets/hike.jpg";

export default function HomePage({ posts, user }) {
  const userPosts = posts?.filter((post) => post.user.email == user.email);
  return (
    <div className="dashboard">
      <div className="post-box">
        <div className="top" style={{ backgroundImage: `url(${hike})` }} />

        <div className="bottom">
          <ul className="post-icons">
            {userPosts.length > 0 ? (
              userPosts.map((post) => {
                return (
                  <div className="post-icon" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                      <li>
                        <img src={post.imageUrl} alt="" />
                        <span>{post.title}</span>
                      </li>
                    </Link>
                  </div>
                );
              })
            ) : (
              <p className="empty-feed">
                You have no posts yet, start posting!
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
