import React, { useState } from "react";
import "@/styles/pages/login.css";
import plantImg from "../../../assets/Plant.png";
import { useAuth } from "@/hooks/api/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [registerMode, setRegisterMode] = useState(false);

  const { login, register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        email,
        password,
        passwordConfirmation: passwordConfirm
      });
      navigate("/home");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        {registerMode ? (
          <>
            <h2>Get Started Now!</h2>
            <form onSubmit={handleRegisterSubmit}>
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
              <input
                type="password"
                placeholder="Re-enter Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
              <button type="submit" disabled={isLoading}>Register</button>
            </form>
            {error && <p className="error-text">{error.message || "Registration error"}</p>}
            {isLoading && <p>Loading...</p>}
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
              <button type="submit" disabled={isLoading}>Sign in</button>
            </form>
            {error && <p className="error-text">{error.message || "Login error"}</p>}
            {isLoading && <p>Loading...</p>}
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
