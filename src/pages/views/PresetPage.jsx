/**
 * @file PresetPage.jsx
 * @description View component for the Preset Page in the SmartGrow dashboard.
 * Renders a list of plant presets using the PresetCard component.
 * This component is currently visual-only and will be integrated with backend logic in the future.
 * 
 * @author Sophia Justin, Alexa Kelemen
 * @since 1.0.0
 */

import React from "react";
import "@/styles/pages/preset.css"; // Ensure this path is correct
import presets from "@/pages/viewmodels/Preset";
import PresetCard from "@/components/PresetCard";

/**
 * Renders the Preset Page UI.
 * Includes a button for creating new presets and dynamically displays
 * a list of preset cards using the static data from the view model.
 *
 * @returns {JSX.Element} The rendered preset page component.
 */
const PresetPage = () => {
  return (
    <div className="preset-page">
      <div className="preset-header">
        <button className="create-btn">Create Preset</button>
      </div>

      <div className="preset-cards">
        {presets.map((preset) => (
          <PresetCard key={preset.id} preset={preset} />
        ))}
      </div>
    </div>
  );
};

export default PresetPage;
