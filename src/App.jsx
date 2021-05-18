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
        <Nav
          user={databaseUser}
          onUpdateUser={(data) => setDatabaseUser(data)}
        />

        <div className="body-container">
          <Switch>
            <Route path="/" exact>
              <HomePage user={databaseUser} posts={posts} />
            </Route>

            <Route path="/feed" exact>
              <Feed posts={posts} />
            </Route>

            <Route exact path="/new">
              <PostForm
                user={databaseUser}
                onPost={(data) => setPosts([...posts, data])}
              />
            </Route>

            <Route
              path="/posts/:id"
              render={({ match }) => (
                <DetailedPostPage
                  match={match}
                  user={databaseUser}
                  posts={posts}
                  onUpdate={(data) =>
                    setPosts(
                      posts?.map((post) => (post.id !== data.id ? post : data))
                    )
                  }
                  onDelete={(data) =>
                    setPosts(posts.filter((post) => post.id != data.id))
                  }
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </>
  );

  return loggedIn ? authroized : <LandingPage />;
}

export default App;
