import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { userPath } from "@/api/axiosConfig";


const UserSettingsPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action is permanent.");
    if (!confirmed) return;

    try {
      await API.delete(`${userPath}`, {
        data: {
          email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
    } catch (err) {
      console.error("Account deletion failed:", err);
      alert("Failed to delete account. Please check your email and password.");
    }
  };

  return (
    <div className="user-settings-form">
      <h2>Account Settings</h2>
      <p>Enter your login info to confirm account deletion:</p>
      <input
        type="email"
        placeholder="Email"
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
      <button onClick={handleDelete} className="btn btn--destructive">
  Delete My Account
</button>

    </div>
  );
};

export default UserSettingsPage;
