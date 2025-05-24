import React, { useState, useEffect } from "react";
import "@/styles/pages/greenhouse.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

/**
 * @typedef {Object} GreenhouseCardProps
 * @property {Object} greenhouse - GreenhouseDTO object.
 * @property {Function} onUnpair - Callback to unpair the greenhouse.
 * @property {Function} onConfigure - Callback to configure the greenhouse.
 */

/**
 * Displays a single greenhouse card with details and actions.
 *
 * @param {GreenhouseCardProps} props
 * @returns {JSX.Element}
 */
const GreenhouseCard = ({ greenhouse, onUnpair,onConfigure }) => {
  const navigate = useNavigate();

  // Fallback to default image if greenhouse.imageUrl is undefined
  const imageSrc = greenhouse.imageUrl || "/images/greenhouse.png";

  const [type, setType] = useState("lighting");
  const [method, setMethod] = useState("manual");

  const handleConfigure = async (e) => {
    e.preventDefault();
    try {
      await onConfigure(greenhouse.id, greenhouse.id, { type, method });
      alert("Configuration applied!");
    } catch (error) {
      console.error("Configuration failed:", error);
      alert("Failed to configure greenhouse.");
    }
  };

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
         {/* Configuration Form */}
      <form className="config-form" onSubmit={handleConfigure}>
        <div className="config-selects">
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="lighting">Lighting</option>
            <option value="watering">Watering</option>
            <option value="fertilization">Fertilization</option>
          </select>

          <select value={method} onChange={(e) => setMethod(e.target.value)} required>
            <option value="manual">Manual</option>
          </select>
        </div>
        <Button type="submit" variant="default" size="sm">
          Apply Configuration
        </Button>
      </form>
    </div>
  );
};

export default GreenhouseCard;
