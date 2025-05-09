import React from "react";
import "@/styles/pages/greenhouse.css"; 
import { useNavigate } from "react-router-dom";
import greenhouse from '@/pages/viewmodels/Greenhouses.js';

const GreenhouseCard = ({ greenhouse }) => {
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
        <div className="info-box">🌞<br />Lighting<br />{greenhouse.lighting}</div>
        <div className="info-box">🌡️<br />Temperature<br />{greenhouse.temperature}</div>
        <div className="info-box">💧<br />Humidity<br />{greenhouse.humidity}</div>
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

const GreenhousePage = () => {
   const navigate = useNavigate();
  return (
    <main>
      <div className="action-buttons">
       <button
  className="pair-button"
  onClick={() => navigate('/pair-greenhouse')}
>
  Pair Greenhouse
</button>

        
      </div>

      <div className="greenhouse-grid">
        {greenhouse.map((gh) => (
          <GreenhouseCard key={gh.id} greenhouse={gh} />
        ))}
      </div>
    </main>
  );
};

export default GreenhousePage;