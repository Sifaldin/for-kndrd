import { React, useEffect, useState } from "react";

import Auth from "../services/Auth";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import logo from "../assets/logo.jpg";

import { useAuth0 } from "@auth0/auth0-react";

export default function LandingPage({ databaseUser, setDatabaseUser }) {
  const [isMember, setIsMember] = useState(true);
  /* const { isAuthenticated, isLoading, user } = useAuth0();

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
  }, []);
 */
  const login = async (loginData) => {
    const loginSuccess = await Auth.login(loginData);
    if (!loginSuccess) {
      alert("Invalid credentials");
    }
  };

  const register = async (registrationData) => {
    const registerSuccess = await Auth.register(registrationData);
    if (!registerSuccess) {
      alert("Couldn't register check credentials and try again");
    }
  };

  const goRegister = () => {
    setIsMember(false);
  };
  const goLogin = () => {
    setIsMember(true);
  };

  return (
    <div className="LandingPage">
      <div className="login-grid">
        <div className="login-text-box">
          <img src={logo} alt=" Logo" />
          <p>Hiking events' planner for kindred emplooyes!</p>
        </div>
        {isMember ? (
          <LoginForm onSubmit={login} goRegister={goRegister} />
        ) : (
          <RegisterForm onSubmit={register} goLogin={goLogin} />
        )}
      </div>
    </div>
  );
}
