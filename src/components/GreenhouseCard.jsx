import React from "react";
import "@/styles/pages/greenhouse.css";
import { useNavigate } from "react-router-dom";

const GreenhouseCard = ({ greenhouse }) => {
  const navigate = useNavigate();
  return (
    <div className="greenhouse-card">
      <div className="image-container">
        <img src={greenhouse.imageUrl} alt={greenhouse.name} />
        <div className="top-labels">
          <span className="green-label">{greenhouse.name}</span>
          <button className="unpair-button">Unpair Greenhouse</button>
        </div>
      </div>
      <div className="info-cards">
        <div className="info-box">
          <span>🌞</span>
          <span>Lighting</span>
          <span>{greenhouse.lighting}</span>
        </div>
        <div className="info-box">
          <span>🌡️</span>
          <span>Temperature</span>
          <span>{greenhouse.temperature}</span>
        </div>
        <div className="info-box">
          <span>💧</span>
          <span>Humidity</span>
          <span>{greenhouse.humidity}</span>
        </div>
      </div>
      <button
        className="edit-button"
        onClick={() => navigate(`/edit-greenhouse/${greenhouse.id}`)}
      >
        Edit
      </button>
    </div>
  );
};

export default GreenhouseCard;
