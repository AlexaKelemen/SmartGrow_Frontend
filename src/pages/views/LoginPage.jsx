import React, { useState } from "react";
import "@/styles/pages/login.css";
import plantImg from "../../../assets/Plant.png";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);
  const navigate = useNavigate();


  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ MOCK-RELATED: Login handler using /api/auth/login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }) // ✅ MOCK: expects { username, password }
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("authToken", data.token); // ✅ MOCK: save token
        alert("Login successful!");
        navigate("/greenhouses"); 
      } else {
        alert("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong.");
    }
  };

  // ✅ MOCK-RELATED: Register handler using /api/auth/register
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return alert("Please enter a valid email address.");
    if (password !== confirmPassword) return alert("Passwords do not match.");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }) // ✅ MOCK: format expected by mock
      });

      if (res.status === 201) {
        const data = await res.json();
        localStorage.setItem("authToken", data.token); // ✅ Save mock token
        alert("Registration successful!");
        setRegisterMode(false); // switch to login
      } else if (res.status === 409) {
        alert("User already exists.");
      } else {
        alert("Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong.");
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
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
