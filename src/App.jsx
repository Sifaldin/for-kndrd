import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./css/App.css";

import Auth from "./services/Auth";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Feed from "./pages/Feed";
import PostForm from "./components/posts/PostForm";
import Api from "./api/Api";
import Nav from "./components/layout/Nav";
import DetailedPostPage from "./pages/DetailedPostPage";
import { useAuth0 } from "@auth0/auth0-react";
import AuthApi from "./api/AuthApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());
  const [posts, setPosts] = useState([]);
  const [databaseUser, setDatabaseUser] = useState({});
  const { isAuthenticated, isLoading, user } = useAuth0();

  Auth.bindLoggedInStateSetter(setLoggedIn);

  // set database user when logging in with auth0
  useEffect(() => {
    if (isAuthenticated) {
      AuthApi.logGoogleUserIn(user);
    }
  }, [isAuthenticated]);

  //Fetch User
  useEffect(() => {
    if (loggedIn) {
      const fetchUser = async () => {
        try {
          const { data } = await Api.get("/user");
          setDatabaseUser(data);
        } catch (e) {
          console.error(e);
        }
      };
      fetchUser();
    }
  }, [loggedIn, isAuthenticated]);

  //Fetch All Posts
  useEffect(() => {
    if (loggedIn) {
      const fetchPosts = async () => {
        try {
          const { data } = await Api.get(`/posts`);
          setPosts(data);
        } catch (e) {
          console.error(e);
        }
      };
      fetchPosts();
    }
  }, [loggedIn, isAuthenticated]);

  const authroized = (
    <>
      <Router>
        <Nav user={databaseUser} setUser={setDatabaseUser} />

        <div className="body-container">
          <Switch>
            <Route path="/" exact>
              <HomePage user={databaseUser} posts={posts} />
            </Route>

            <Route path="/feed" exact>
              <Feed posts={posts} />
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

  if (isLoading) return <div>Loading....</div>;

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
