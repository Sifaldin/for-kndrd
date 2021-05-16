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
  const [userPosts, setUserPosts] = useState([]);

  const { isAuthenticated, isLoading, user } = useAuth0();

  console.log("google", user);

  Auth.bindLoggedInStateSetter(setLoggedIn);

  //Fetch All Posts
  useEffect(() => {
    if (loggedIn || isAuthenticated) {
      const fetchPosts = async () => {
        await Api.get(`/posts`).then((res) => setPosts(res.data));
      };
      fetchPosts();
    }
  }, [loggedIn]);

  //Fetch User
  useEffect(() => {
    if (loggedIn || isAuthenticated) {
      const fetchUser = async () => {
        await Api.get(`/user`).then((res) => setDatabaseUser(res.data));
      };
      fetchUser();
    }
  }, [loggedIn]);

  //Fetch User's Posts
  useEffect(() => {
    if (loggedIn || (isAuthenticated && posts.length !== 0)) {
      const fetchUserPosts = async () => {
        await Api.get(`/posts`).then((res) => {
          setUserPosts(
            res?.data?.filter((p) => p.user.email === databaseUser.email)
          );
        });
      };
      fetchUserPosts();
    }
  }, [loggedIn, databaseUser, posts]);

  const registerGoogleUser = async () =>
    await Auth.register({
      name: user.name,
      email: user.email,
      imageUrl: user.picture,
      password: user.nickname,
    });

  const logGoogleUserIn = async () =>
    await Auth.login({
      name: user.name,
      email: user.email,
      password: user.nickname,
    });

  useEffect(() => {
    if (isAuthenticated) {
      logGoogleUserIn();
      setDatabaseUser({
        ...databaseUser,
        imageUrl: user.picture,
        name: user.name,
      });
    }
  }, [isAuthenticated]);

  console.log(databaseUser);

  const loggedInRouter = (
    <>
      <Router>
        <Nav
          onLogout={() => Auth.logout()}
          user={databaseUser}
          setUser={setDatabaseUser}
        />

        <div className="body-container">
          <Switch>
            {/* The route displays the application's homepage */}
            <Route path="/" exact>
              <HomePage
                user={databaseUser}
                setDatabaseUser={setDatabaseUser}
                userPosts={userPosts}
              />
            </Route>

            <Route path="/posts" exact>
              <PostsPage posts={posts} loggedInUser={databaseUser} />
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

  return loggedIn || isAuthenticated ? loggedInRouter : <LandingPage />;
}

export default App;
