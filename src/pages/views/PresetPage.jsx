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
import "../../styles/pages/preset.css"; 
import presets from '../../pages/viewmodels/Preset';

/**
 * Functional React component to render the preset page UI.
 * Maps over preset data and renders a card for each preset.
 */
const PresetPage = () => {
    return (
        <div className="preset-container">
            <h1>Presets</h1>

            <div className="preset-list">
                {presets.map((preset, index) => (
                    <div className="preset-card" key={index}>
                        <h2>{preset.name}</h2>
                        <p><strong>Light:</strong> {preset.light}</p>
                        <p><strong>Water:</strong> {preset.water}</p>
                        <p><strong>Humidity:</strong> {preset.humidity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PresetPage;
