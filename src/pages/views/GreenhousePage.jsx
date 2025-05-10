import React from "react";
import "@/styles/pages/greenhouse.css";
import GreenhouseCard from "@/components/GreenhouseCard";
import greenhouse from "@/pages/viewmodels/Greenhouses.js";

const GreenhousePage = () => {
  return (
    <div className="greenhouse-page">
      <h2 className="section-title">Greenhouses:</h2>
      <div className="action-buttons">
        <button>Pair Greenhouse</button>
        <button>Edit Greenhouse</button>
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
