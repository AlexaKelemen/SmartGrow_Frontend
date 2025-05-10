import React, { useState } from "react";
import "@/styles/pages/login.css";
import plantImg from "../../../assets/Plant.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Register submitted");
    // Add real logic here
  };

  return (
    <div className="login-page">
      <div className="login-left">
        {registerMode ? (
          <>
            <h2>Get Started Now!</h2>
            <form onSubmit={handleRegisterSubmit}>
              <input type="email" placeholder="Email address" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Re-enter Password" required />
              <button type="submit">Register</button>
            </form>
            <p className="signup-text">
              Already have an account?{" "}
              <span className="signup-link" onClick={() => setRegisterMode(false)}>
                Sign in
              </span>
            </p>
          </>
        ) : (
          <>
            <h2>Welcome back!</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Sign in</button>
            </form>
            <p className="signup-text">
              Don’t have an account?{" "}
              <span className="signup-link" onClick={() => setRegisterMode(true)}>
                Sign up
              </span>
            </p>
          </>
        )}
      </div>

      <div className="login-right">
        <img src={plantImg} alt="Plant background" />
      </div>
    </div>
  );
};

export default LoginPage;
