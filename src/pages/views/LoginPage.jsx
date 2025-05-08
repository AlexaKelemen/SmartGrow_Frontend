import React, { useState } from "react";
import "@/styles/pages/login.css"; 
import plantImg from "../../../assets/Plant.png";






const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
  };

  return (
    <div className="login-page">
      {/* Left side - Form */}
      <div className="login-left">
        <h2>Welcome back!</h2>
        <form onSubmit={handleSubmit}>
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
      </div>

      {/* Right side - Image */}
      <div className="login-right">
        <img src={plantImg} alt="Plant background" />
      </div>
    </div>
  );
};

export default LoginPage;
