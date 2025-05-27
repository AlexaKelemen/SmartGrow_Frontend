import React, { useState, useEffect } from "react";
import "@/styles/pages/greenhouse.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useSensor } from "@/hooks/api/useSensor";


/**
 * @typedef {Object} GreenhouseCardProps
 * @property {Object} greenhouse - GreenhouseDTO object.
 * @property {Function} onUnpair - Callback to unpair the greenhouse.
 * @property {Function} onConfigure - Callback to configure the greenhouse.
 * @property {Array<Object>} presets - List of available presets to choose from.
 * @property {Function} onApplyPreset - Called with (greenhouseId, presetId)
 */

/**
 * Displays a single greenhouse card with details and actions.
 *
 * @param {GreenhouseCardProps} props
 * @returns {JSX.Element}
 */
const GreenhouseCard = ({ greenhouse, onUnpair,onConfigure,presets = [], onApplyPreset }) => {
  const navigate = useNavigate();
  const { getCurrentReadings } = useSensor();


  // Fallback to default image if greenhouse.imageUrl is undefined
  const imageSrc = greenhouse.imageUrl || `${import.meta.env.BASE_URL}images/greenhouse.png`;

  const [type, setType] = useState("lighting");
  const [method, setMethod] = useState("manual");
  const [selectedPresetId, setSelectedPresetId] = useState("");


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
      <div className="info-buttons">
  <Button variant="default" size="sm"   onClick={() => navigate(`/greenhouses/${greenhouse.id}/lighting`)}>
    🌞 Lighting: {greenhouse.lightingMethod}
  </Button>
  <Button variant="default" size="sm"   onClick={() => navigate(`/greenhouses/${greenhouse.id}/watering`)}>
    🚿 Watering: {greenhouse.wateringMethod }
  </Button>
  <Button
    variant="default"
    size="sm"
    onClick={() => navigate(`/greenhouses/${greenhouse.id}/soil-humidity`)}
    >
      🌱 Soil Humidity: {greenhouse.soilHumidity}
    </Button>
</div>

   
      {/* PRESETS */}
      <div className="section presets">
        <div className="section-header">
          <h4>Presets</h4>
          <Button variant="default" size="sm" onClick={() => navigate(`/greenhouses/${greenhouse.id}/presets`)}>
            View Presets
          </Button>
        </div>
        <div className="horizontal-row">
          <select
            value={selectedPresetId}
            onChange={(e) => setSelectedPresetId(Number(e.target.value))}
          >
            <option value="">Choose a preset</option>
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
          <Button
            variant="default"
            size="sm"
            onClick={() => onApplyPreset(greenhouse.id, selectedPresetId)}
            disabled={!selectedPresetId}
          >
            Apply Preset
          </Button>
        </div>
      </div>

      {/* CONFIGURATION */}
      <div className="section config">
        <h4>Configure System</h4>
        <form className="horizontal-row" onSubmit={handleConfigure}>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="lighting">Lighting</option>
            <option value="watering">Watering</option>
            <option value="fertilization">Fertilization</option>
          </select>

          <select value={method} onChange={(e) => setMethod(e.target.value)} required>
            <option value="manual">Manual</option>
          </select>

          <Button type="submit" variant="default" size="sm">
            Apply Configuration
          </Button>
        </form>
      </div>

      {/* ACTIONS */}
      <div className="section actions">
        <h4>Actions</h4>
        <div className="vertical-buttons">
          <Button variant="edit" size="sm" onClick={() => navigate(`/edit-greenhouse/${greenhouse.id}`)}>Edit Greenhouse</Button>
          <Button variant="default" size="sm" onClick={() => navigate(`/greenhouses/logs/${greenhouse.id}`)}>View Logs and Actions</Button>
          <Button variant="default" size="sm" onClick={() => navigate(`/dashboard/${greenhouse.id}`)}>View Dashboard</Button>
        </div>
      </div>
    </div>
  );
};

export default GreenhouseCard;
