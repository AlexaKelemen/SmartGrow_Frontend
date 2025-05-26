import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "@/styles/components/presetForm.css";

const PresetForm = ({ mode, onSubmit, initialData = {} }) => {
  const navigate = useNavigate();
  const isEdit = mode === "edit";

 const [name, setName] = useState(initialData.name || "");
  const [minAirHumidity, setMinAirHumidity] = useState(initialData.minAirHumidity  ?? "");
  const [maxAirHumidity, setMaxAirHumidity] = useState(initialData.maxAirHumidity  ?? "");
  const [minTemperature, setMinTemperature] = useState(initialData.minTemperature  ?? "");
  const [maxTemperature, setMaxTemperature] = useState(initialData.maxTemperature  ?? "");
  const [minSoilHumidity, setMinSoilHumidity] = useState(initialData.minSoilHumidity  ?? "");
  const [maxSoilHumidity, setMaxSoilHumidity] = useState(initialData.maxSoilHumidity  ?? "");
  const [hoursOfLight, setHoursOfLight] = useState(initialData.hoursOfLight  ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      minTemperature,
      maxTemperature,
      minAirHumidity,
      maxAirHumidity,
      minSoilHumidity,
      maxSoilHumidity,
      hoursOfLight,
      greenhouses: [] // You can handle this later if needed
    };

    onSubmit(formData); // sends data to CreatePresetForm
  };

  return (
    <form onSubmit={handleSubmit} className={isEdit ? "edit-preset-page" : "create-preset-form-page"}>
      <h2>{isEdit ? "Edit Preset" : "Create preset"}</h2>

      {!isEdit && (
        <div>
          <label>Name of the preset</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Tomato" required />
        </div>
      )}

      <div className="input-row">
        <div>
          <label>Air humidity</label>
          <div className="input-pair">
            <input type="number" value={minAirHumidity} onChange={(e) => setMinAirHumidity(Number(e.target.value))} placeholder="Min" />
            <input type="number" value={maxAirHumidity} onChange={(e) => setMaxAirHumidity(Number(e.target.value))} placeholder="Max" />
          </div>
        </div>

        <div>
          <label>Temperature</label>
          <div className="input-pair">
            <input type="number" value={minTemperature} onChange={(e) => setMinTemperature(Number(e.target.value))} placeholder="Min" />
            <input type="number" value={maxTemperature} onChange={(e) => setMaxTemperature(Number(e.target.value))} placeholder="Max" />
          </div>
        </div>
      </div>

      <div className="input-row">
        <div>
          <label>Soil humidity</label>
          <div className="input-pair">
            <input type="number" value={minSoilHumidity} onChange={(e) => setMinSoilHumidity(Number(e.target.value))} placeholder="Min" />
            <input type="number" value={maxSoilHumidity} onChange={(e) => setMaxSoilHumidity(Number(e.target.value))} placeholder="Max" />
          </div>
        </div>

        <div>
          <label>Hours of light</label>
          <div className="input-pair">
            <input type="number" value={hoursOfLight} onChange={(e) => setHoursOfLight(Number(e.target.value))} placeholder="Hours" />
          </div>
        </div>
      </div>

      <div className={isEdit ? "button-group" : "form-buttons"}>
        <Button variant="cancel" onClick={() => navigate("/presets")} type="button">
          Cancel
        </Button>
        <Button type="submit">
          {isEdit ? "Edit" : "Create"}
        </Button>
      </div>
    </form>
  );
};

PresetForm.propTypes = {
  mode: PropTypes.oneOf(["create", "edit"]).isRequired,
  onSubmit: PropTypes.func,
  initialData: PropTypes.object,
};

export default PresetForm;

