import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginForm({ onSubmit, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginWithRedirect, user } = useAuth0();

  return (
    <div className="form-wrapper">
      <div className="signinform">
        <input
          id="email1"
          type="text"
          value={email}
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <input
          id="pass2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-type="password"
          placeholder="Enter your password"
        />

        <button
          className="submitButton"
          type="submit"
          onClick={() => onSubmit({ email, password })}
        >
          SIGN IN
        </button>

        <button type="submit" onClick={() => loginWithRedirect()}>
          Sign in with google
        </button>

        <div className="login-options">
          <button
            className="smallButton"
            onClick={() => alert("Think harder!")}
          >
            Forgot password?
          </button>
          <button className="gotoRegister" onClick={goRegister}>
            Not a member?
          </button>
        </div>
      </div>
    </div>
  );
}
