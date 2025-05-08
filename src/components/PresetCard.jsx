/**
 * @file PresetCard.jsx
 * @description Reusable card component for displaying individual plant presets
 * in the SmartGrow webpage. This component receives preset data via props
 * and visually presents key details, including image, name, type, creation and 
 * update dates, along with basic UI buttons for future interaction.
 * 
 * @author Alexa Kelemen
 * @since 1.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import "@/styles/pages/preset.css"; // optional if you want to extract specific styles

const PresetCard = ({ preset }) => {
  return (
    <div className="preset-card">
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
  );
};

PresetCard.propTypes = {
  preset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    updateDate: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default PresetCard;
