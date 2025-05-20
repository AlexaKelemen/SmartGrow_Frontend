import React, { useState } from "react";

const RegisterForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ MOCK-RELATED: Register logic with POST /api/auth/register
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }), // ✅ MOCK: expects { username, password }
      });

      if (response.status === 201) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token); // ✅ MOCK: save mock token
        alert("Registered successfully! Token: " + data.token);
        onClose(); // Close modal
      } else if (response.status === 409) {
        alert("User already exists.");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="register-overlay">
      <div className="register-container">
        <h2>Get Started Now!</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit" className="register-btn">Register</button>
        </form>
        <button className="close-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RegisterForm;
