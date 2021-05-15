import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./css/App.css";

import Auth from "./services/Auth";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import PostForm from "./components/posts/PostForm";
import Api from "./api/Api";
import Nav from "./components/layout/Nav";
import DetailedPostPage from "./pages/DetailedPostPage";


function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);


  Auth.bindLoggedInStateSetter(setLoggedIn);

  //Fetch All Posts
  useEffect(() => {
    if (loggedIn) {
      const fetchPosts = async () => {
       await Api.get(`/posts`).then(res => setPosts(res.data))
      };
      fetchPosts();
    }
  }, [loggedIn]);

  //Fetch User
  useEffect(() => {
    if (loggedIn) {
      const fetchUser = async () => {
       await Api.get(`/user`).then(res => setUser(res.data));
      };
      fetchUser()
    }
  }, [loggedIn]);
  
  //Fetch User's Posts
  useEffect(() => {
    if (loggedIn && posts.length !== 0) {
      const fetchUserPosts = async () => {
       await Api.get(`/posts`).then(res => {
         setUserPosts(res?.data?.filter(
        (p) => p.user.email === user.email))
      }
       )};
      fetchUserPosts()
    }
  }, [loggedIn, user, posts]);

  console.log(posts)

  const loggedInRouter = (
    <>
      <Router>
        <Nav onLogout={() => Auth.logout()} user={user} setUser={setUser} />

        <div className="body-container">
          <Switch>
            {/* The route displays the application's homepage */}
            <Route path="/" exact>
              <HomePage userPosts={userPosts} />
            </Route>

            <Route path="/posts" exact>
              <PostsPage
                posts={posts}
                loggedInUser={user}
              />
            </Route>

            <Route exact path="/new">
              <PostForm setPosts={setPosts} user={user} posts={posts} />
            </Route>

            <Route
              path="/posts/:id"
              render={({ match }) => (
                <DetailedPostPage
                  match={match}
                  setPosts={setPosts}
                  user={user}
                  posts={posts}
                />
              )}
            />

          </Switch>
        </div>
      </Router>

    </>
  );

  // The first page displayed by the app is the login page.
  return loggedIn ? loggedInRouter : <LandingPage />;
}

export default App;
