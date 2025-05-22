import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PresetForm from "@/components/forms/PresetForm";
import { usePreset } from "@/hooks/api/usePreset";

const CreatePresetForm = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const { createPreset } = usePreset();

  const handleSubmit = async (presetData) => {
    try {
      const response = await createPreset(presetData);
      console.log("Created preset:", response);
      setSuccessMessage("✅ Preset created successfully!");
      setTimeout(() => navigate("/presets"), 2000);
    } catch (error) {
      console.error("Failed to create preset:", error);
      setSuccessMessage("❌ Something went wrong. Please try again.");
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


