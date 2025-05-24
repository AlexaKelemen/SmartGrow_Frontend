/**
 * @file PresetCard.jsx
 * @description Reusable card component for displaying individual plant presets
 * in the SmartGrow webpage. Displays key data and a fallback image if none is provided.
 *
 * @author Alexa Kelemen
 * @since 1.0.1
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import "@/styles/pages/preset.css";

const PresetCard = ({ preset, onDelete, onApply, onEdit }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const placeholderImage = "/images/strawberry.png";
  const imageUrl = preset.image || placeholderImage;

  const handleMouseEnter = (e) => {
    if (!e.target.closest(".delete-btn-wrapper")) setHovered(true);
  };

  const handleMouseLeave = (e) => {
    if (!e.target.closest(".delete-btn-wrapper")) setHovered(false);
  };

  return (
    <div
      className="preset-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="preset-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "150px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          position: "relative",
        }}
      >
        <div className="delete-btn-wrapper">
          <Button variant="destructive" size="sm"  onClick={(e) => {
    e.stopPropagation(); 
    onDelete?.();
  }}
>Delete</Button>
        </div>
      </div>

      <div className="preset-info">
        <p><strong>Name:</strong> {preset.name}
        </p>

        {hovered && (
          <div className="hover-details">
            <p>Air humidity: {preset.minAirHumidity}–{preset.maxAirHumidity}%</p>
            <p>Soil humidity: {preset.minSoilHumidity}–{preset.maxSoilHumidity}%</p>
            <p>Temperature: {preset.minTemperature}–{preset.maxTemperature}°C</p>
            <p>Light: {preset.hoursOfLight} hrs</p>
          </div>
        )}

        <div className="preset-buttons">
          <Button variant="edit" size="sm" onClick={()  => navigate(`/presets/edit/${preset.id}`)}>Edit</Button>
        </div>
      </div>
    </div>
  );
};

PresetCard.propTypes = {
  preset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    creationDate: PropTypes.string,
    updateDate: PropTypes.string,
    image: PropTypes.string,
    minAirHumidity: PropTypes.number,
    maxAirHumidity: PropTypes.number,
    minSoilHumidity: PropTypes.number,
    maxSoilHumidity: PropTypes.number,
    minTemperature: PropTypes.number,
    maxTemperature: PropTypes.number,
    hoursOfLight: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onApply: PropTypes.func,
  onEdit: PropTypes.func,
};

export default PresetCard;