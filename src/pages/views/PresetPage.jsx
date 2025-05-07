/**
 * @file PresetPage.jsx
 * @description View component for the Preset Page in the SmartGrow dashboard.
 * Displays a list of plant presets with basic UI for future interaction.
 * Currently visual-only; logic will be connected later via backend integration.
 *
 * @author SophiaJustin
 * @since 1.0.0
 */

import React from "react";
import "@/styles/pages/preset.css"; 
import presets from '@/pages/viewmodels/Preset';

/**
 * Functional React component to render the preset page UI.
 * Maps over preset data and renders a card for each preset.
 */
const PresetPage = () => {
    
  
    return (
      <div className="preset-page">
        <div className="preset-header">
          <button className="create-btn">Create Preset</button>
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
                <p><strong>Name:</strong>{preset.name}</p>
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
