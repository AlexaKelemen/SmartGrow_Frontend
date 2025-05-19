/**
 * @file PresetPage.jsx
 * @description View component for the Preset Page in the SmartGrow dashboard.
 * Displays a list of plant presets from backend API.
 * 
 * @author SophiaJustin,Alexa Kelemen
 * @since 1.0.0
 */


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/pages/preset.css"; 
import presets from "@/pages/viewmodels/Preset";
import PresetCard from "@/components/PresetCard";
import DeletePopUp from "@/components/DeletePopUp";
import { Button } from "@/components/ui/Button";
import { PresetAPI } from "../../api/restApi";


/**
 * Renders the Preset Page UI.
 * Fetches presets from backend, displays cards and handles delete popup.
 *
 * @returns {JSX.Element} The rendered preset page component.
 */
const PresetPage = () => {
  const navigate = useNavigate();
  const [presets, setPresets] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);

  useEffect(() => {
    // Replace with your real backend endpoint to get all presets
    fetchPresets();
  }, []);

  const fetchPresets = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/Preset"); // Replace with your actual URL
      const data = await response.json();
      setPresets(data);
    } catch (error) {
      console.error("Error fetching presets:", error);
    }
  };

  const handleDeleteClick = (preset) => {
    setSelectedPreset(preset);
    setShowPopUp(true);
  };

  const handleCancel = () => {
    setShowPopUp(false);
    setSelectedPreset(null);
  };

  const handleConfirm = async () => {
  try {
    await PresetAPI.deletePreset(selectedPreset.id);
    console.log("Deleted:", selectedPreset.name);

    // Update local state to remove the deleted preset from the list
    setPresets((prevPresets) =>
      prevPresets.filter((p) => p.id !== selectedPreset.id)
    );

    setShowPopUp(false);
    setSelectedPreset(null);
  } catch (error) {
    console.error("Failed to delete preset:", error);
  }
};


  const handleViewPreset = (id) => {
    navigate(`/presets/${id}`);
  };

  return (
    <div className="preset-page">
      <div className="preset-header">
        <Button variant="default" onClick={() => navigate("/presets/create")}>
          Create Preset
        </Button>
      </div>

      <div className="preset-cards">
        {presets.map((preset) => (
          <div key={preset.id} onClick={() => handleViewPreset(preset.id)}>
            <PresetCard
              preset={preset}
              onDelete={() => handleDeleteClick(preset)}
            />
          </div>
        ))}
      </div>

      {showPopUp && selectedPreset && (
        <DeletePopUp
          presetName={selectedPreset.name}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default PresetPage;