/**
 * @file PresetPage.jsx
 * @description View component for the Preset Page in the SmartGrow dashboard.
 * Renders a list of plant presets using the PresetCard component.
 * This component is currently visual-only and will be integrated with backend logic in the future.
 * 
 * @author Sophia Justin, Alexa Kelemen
 * @since 1.0.0
 */

import React ,{ useState } from "react";
import "@/styles/pages/preset.css"; 
import presets from "@/pages/viewmodels/Preset";
import PresetCard from "@/components/PresetCard";
import DeletePopUp from "@/components/DeletePopUp";


/**
 * Renders the Preset Page UI.
 * Includes a button for creating new presets and dynamically displays
 * a list of preset cards using the static data from the view model.
 *
 * @returns {JSX.Element} The rendered preset page component.
 */
const PresetPage = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);

  const handleDeleteClick = (preset) => {
    setSelectedPreset(preset);
    setShowPopUp(true);
  };

  const handleCancel = () => {
    setShowPopUp(false);
    setSelectedPreset(null);
  };

  const handleConfirm = () => {
    console.log("Deleted preset:", selectedPreset.name);
    // TODO: Add deletion logic here
    setShowPopUp(false);
    setSelectedPreset(null);
  };

  return (
    <div className="preset-page">
      <div className="preset-header">
        <button className="create-btn">Create Preset</button>
      </div>

      <div className="preset-cards">
        {presets.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            onDelete={() => handleDeleteClick(preset)}
          />
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
