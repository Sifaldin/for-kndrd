import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function RegisterForm({ onSubmit, goLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginWithRedirect } = useAuth0();

  return (
    <div className="form-wrapper">
      <div className="signupform">
        <input
          id="user"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Create your Username"
        />

        <input
          id="email2"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />

        <input
          id="pass1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-type="password"
          placeholder="Create your password"
        />

        <button
          className="submitButton"
          type="submit"
          onClick={() => onSubmit({ name, email, password })}
          value="Sign Up"
        >
          SIGN UP
        </button>

        <button
          type="submit"
          onClick={() => loginWithRedirect()}
          value="Sign Up"
        >
          Sign up with Google
        </button>

        <button className="smallButton" onClick={goLogin}>
          Already a Member?
        </button>
      </div>
    </div>
  );
}
