/**
 * @file GreenhousePage.jsx
 * @description Displays a dashboard of paired greenhouses and their environmental conditions.
 * Includes navigation to pair/edit greenhouses.
 * @author: SophiaJustin
 */

import React from "react";
import "@/styles/pages/greenhouse.css";
import { useNavigate } from "react-router-dom";
import GreenhouseCard from "@/components/GreenhouseCard"; 
import greenhouse from "@/pages/viewmodels/Greenhouses.js";

const GreenhousePage = () => {

   const navigate = useNavigate();
  return (
    <div className="greenhouse-page">
      <h2 className="section-title">Greenhouses</h2>
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
    </div>
  );
};

export default GreenhousePage;
