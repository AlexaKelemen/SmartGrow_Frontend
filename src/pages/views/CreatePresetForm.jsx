import React from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/pages/createPresetForm.css"; 

const CreatePresetForm = () => {
  const navigate = useNavigate();

  return (
    <div className="create-preset-form-page">
      <h2>Create preset</h2>

      {/* Preset name */}
      <div>
        <label>Name of the preset</label>
        <input type="text" placeholder="e.g. Tomato" />
      </div>

      {/* Metric Groups in two rows */}
      <div className="input-row">
        <div>
          <label>Air humidity</label>
          <div className="input-pair">
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div>
        </div>

        <div>
          <label>Temperature humidity</label>
          <div className="input-pair">
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div>
        </div>
      </div>

      <div className="input-row">
        <div>
          <label>Soil humidity</label>
          <div className="input-pair">
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div>
        </div>

        <div>
          <label>Brightness</label>
          <div className="input-pair">
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="form-buttons">
        <button className="cancel-btn" onClick={() => navigate("/presets")}>
          Cancel
        </button>
        <button className="create-btn">
          Create
        </button>
      </div>
    </div>
  );
};

export default CreatePresetForm;
