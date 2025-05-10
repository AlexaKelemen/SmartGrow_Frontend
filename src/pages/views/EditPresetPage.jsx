import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@/styles/pages/editPresetPage.css"; 

const PresetEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="preset-edit-container">
      <h2>Edit preset</h2>

      <div className="preset-form">
        <div className="column">
          <label>Air humidity</label>
          <input type="number" placeholder="10" />
          <input type="number" placeholder="99" />

          <label>Soil humidity</label>
          <input type="number" placeholder="10" />
          <input type="number" placeholder="99" />
        </div>

        <div className="column">
          <label>Temperature humidity</label>
          <input type="number" placeholder="10" />
          <input type="number" placeholder="92" />

          <label>Brightness</label>
          <input type="number" placeholder="10" />
          <input type="number" placeholder="99" />
        </div>
      </div>

      <div className="preset-edit-buttons">
        <button className="cancel-btn" onClick={() => navigate("/presets")}>Cancel</button>
        <button className="edit-btn">Edit</button>
      </div>
    </div>
  );
};

export default PresetEditPage;
