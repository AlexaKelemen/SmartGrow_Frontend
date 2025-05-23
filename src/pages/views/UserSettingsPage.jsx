import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/api/useUser";

const UserSettingsPage = () => {
  const navigate = useNavigate();
  const { deleteUser, isLoading, error } = useUser();
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to permanently delete your account?");
    if (!confirmed) return;

    try {
      await deleteUser(password);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
    } catch (err) {
      console.error("Account deletion failed:", err);
      alert("Failed to delete account. Please check your password.");
    }
  };

  return (
    <div className="user-settings-form">
      <h2>Delete Account</h2>
      <p>Enter your password to confirm:</p>
      <input
        type="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        className="btn btn--destructive"
        onClick={handleDelete}
        disabled={isLoading}
      >
        Delete My Account
      </button>
      {error && <p className="error-text">{error.message || "Error deleting account."}</p>}
    </div>
  );
};

export default UserSettingsPage;
