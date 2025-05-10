/**
 * @file PresetPage.jsx
 * @description View component for the Preset Page in the SmartGrow dashboard.
 * Displays a list of plant presets with basic UI for future interaction.
 * Currently visual-only; logic will be connected later via backend integration.
 * 
 * @author SophiaJustin
 * @since 1.0.0
 */

//import React ,{ useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <div className="preset-page">
      <div className="preset-header">
        <button className="create-btn" onClick={() => navigate("/presets/create")}>
          Create Preset
        </button>
      </div>

      <div className="preset-cards">
        {presets.map((preset) => (
          <div key={preset.id} className="preset-card">
            <div
              className="preset-image"
              style={{ backgroundImage: `url(${preset.image})` }}
            >
              <span className="delete-btn">Delete</span>
              <h2>{preset.name}</h2>
            </div>

            <div className="preset-info">
              <p><strong>Name:</strong> {preset.name}</p>
              <p><strong>Type:</strong> {preset.type}</p>
              <p>
                <strong>Created / Updated dates:</strong><br />
                {preset.creationDate} - {preset.updateDate}
              </p>

              <div className="preset-buttons">
                <button className="edit-btn">Edit</button>
                <button className="apply-btn">Apply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresetPage;
