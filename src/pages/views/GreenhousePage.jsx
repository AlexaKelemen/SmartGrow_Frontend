/**
 * @file GreenhousePage.jsx
 * @description Displays a dashboard of paired greenhouses and their environmental conditions.
 * Includes navigation to pair/edit greenhouses 
 * @author: SophiaJustin
 */

import React from "react";
import "@/styles/pages/greenhouse.css";
import GreenhouseCard from "@/components/GreenhouseCard";
import greenhouse from "@/pages/viewmodels/Greenhouses.js";

import { useNavigate } from "react-router-dom";

// Component to display a single greenhouse card with info and image
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
    </div>
  );
};

export default GreenhousePage;
