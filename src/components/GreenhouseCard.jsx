import React from "react";
import "@/styles/pages/greenhouse.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

/**
 * @typedef {Object} GreenhouseCardProps
 * @property {Object} greenhouse - GreenhouseDTO object.
 * @property {Function} onUnpair - Callback to unpair the greenhouse.
 */

/**
 * Displays a single greenhouse card with details and actions.
 *
 * @param {GreenhouseCardProps} props
 * @returns {JSX.Element}
 */
const GreenhouseCard = ({ greenhouse, onUnpair }) => {
  const navigate = useNavigate();

  // Fallback to default image if greenhouse.imageUrl is undefined
  const imageSrc = greenhouse.imageUrl || "/images/greenhouse.png";

  return (
    <div className="greenhouse-card">
      <div className="image-container">
        <img src={imageSrc} alt={greenhouse.name} />
        <div className="top-labels">
          <span className="green-label">{greenhouse.name}</span>
          <Button variant="cancel" size="sm" onClick={() => onUnpair(greenhouse)}>
            Unpair Greenhouse
          </Button>
        </div>
      </div>

      <div className="info-cards">
        <div className="info-box">
          <span>🌞</span>
          <span>Lighting</span>
          <span>{greenhouse.lightingMethod || "N/A"}</span>
        </div>
        <div className="info-box">
          <span>🚿</span>
          <span>Watering</span>
          <span>{greenhouse.wateringMethod || "N/A"}</span>
        </div>
        <div className="info-box">
          <span>🧪</span>
          <span>Fertilization</span>
          <span>{greenhouse.fertilizationMethod || "N/A"}</span>
        </div>
      </div>

      <Button
        variant="edit"
        size="sm"
        onClick={() => navigate(`/edit-greenhouse/${greenhouse.id}`)}
      >
        Edit
      </Button>
      <Button
          variant="default"
          size="sm"
          onClick={() => navigate(`/greenhouses/logs/${greenhouse.id}`)}
        >
          View Logs
        </Button>
    </div>
  );
};

export default GreenhouseCard;
