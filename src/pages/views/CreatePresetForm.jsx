import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PresetForm from "@/components/forms/PresetForm";
import { usePreset } from "@/hooks/api/usePreset";

const CreatePresetForm = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const { createPreset, isLoading, error } = usePreset();
    
  const handleSubmit = async (presetData) => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      
    if (!userEmail) {
      alert("User email is missing. Please log in again.");
      return;
    }
    const fullData = {
      ...presetData,
      userEmail 
    };
    const response = await createPreset(fullData);
    console.log("Created preset:", response);

      setSuccessMessage(" Preset created successfully!");

      setTimeout(() => {
        navigate("/presets");
      }, 2000);
    } catch (err) {
      console.error("Failed to create preset:", err);
      setSuccessMessage("Something went wrong. Please try again.");
    }
  };


  return (
    <div>
      <PresetForm mode="create" onSubmit={handleSubmit} />
      {successMessage && (
        <p style={{ marginTop: "1rem", color: successMessage.startsWith("✅") ? "green" : "red" }}>
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default CreatePresetForm;


