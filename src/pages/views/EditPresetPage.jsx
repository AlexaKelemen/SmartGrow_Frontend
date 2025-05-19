import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PresetForm from "@/components/forms/PresetForm";
import { PresetAPI } from "@/api/restApi";

const EditPresetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preset, setPreset] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchPreset = async () => {
      try {
        const data = await PresetAPI.getPresetById(id);
        setPreset(data);
      } catch (error) {
        console.error("Failed to load preset:", error);
      }
    };

    fetchPreset();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await PresetAPI.updatePreset(id, updatedData);
      setSuccessMessage("✅ Preset updated successfully!");
      setTimeout(() => {
        navigate("/presets");
      }, 2000);
    } catch (error) {
      console.error("Failed to update preset:", error);
      setSuccessMessage("❌ Update failed. Please try again.");
    }
  };

  if (!preset) return <p>Loading preset...</p>;

  return (
    <div>
      <PresetForm mode="edit" onSubmit={handleSubmit} initialData={preset} />
      {successMessage && (
        <p style={{ color: successMessage.startsWith("✅") ? "green" : "red", marginTop: "1rem" }}>
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default EditPresetPage;

