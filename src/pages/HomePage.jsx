import React from "react";
import { Link } from "react-router-dom";
import banner from "../assets/banner.jpg"

export default function HomePage({ userPosts }) {

  return (
    <div className="dashboard">
      <div className="post-box">
        
        <div className="top" style={{ backgroundImage: `url(${banner})` }} />

        <div className="bottom">
          <ul className="post-icons">
            {userPosts?.map((post) => {
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
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
