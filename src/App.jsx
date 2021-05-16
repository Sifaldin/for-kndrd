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
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
  const [posts, setPosts] = useState([]);
  const [databaseUser, setDatabaseUser] = useState({});
  const { isAuthenticated, isLoading, user, logout } = useAuth0();

  const logGoogleUserIn = () => {
    Auth.login({
      email: user.email,
      password: user.nickname,
      name: user.name,
      imageUrl: user.picture,
    });
  };

  Auth.bindLoggedInStateSetter(setLoggedIn);

  // set database user when logging in with auth0
  useEffect(() => {
    if (isAuthenticated) {
      logGoogleUserIn();
    }
  }, [isAuthenticated]);
  //Fetch User
  useEffect(() => {
    if (loggedIn) {
      const fetchUser = async () => {
        await Api.get(`/user`).then((res) => setDatabaseUser(res.data));
      };
      fetchUser();
    }
  }, [loggedIn, isAuthenticated]);

  //Fetch All Posts
  useEffect(() => {
    if (loggedIn) {
      const fetchPosts = async () => {
        await Api.get(`/posts`).then((res) => setPosts(res.data));
      };
      fetchPosts();
    }
  }, [loggedIn, setPosts, isAuthenticated]);

  const authroized = (
    <>
      <Router>
        <Nav user={databaseUser} setUser={setDatabaseUser} />

        <div className="body-container">
          <Switch>
            <Route path="/" exact>
              <HomePage user={databaseUser} posts={posts} />
            </Route>

            <Route path="/posts" exact>
              <PostsPage posts={posts} />
            </Route>

            <Route exact path="/new">
              <PostForm setPosts={setPosts} user={databaseUser} posts={posts} />
            </Route>

            <Route
              path="/posts/:id"
              render={({ match }) => (
                <DetailedPostPage
                  match={match}
                  setPosts={setPosts}
                  user={databaseUser}
                  posts={posts}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </>
  );

  return loggedIn ? (
    authroized
  ) : (
    <LandingPage
      databaseUser={databaseUser}
      setDatabaseUser={setDatabaseUser}
    />
  );
}

export default App;
