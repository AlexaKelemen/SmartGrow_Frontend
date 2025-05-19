/**
 * @file GreenhousePage.jsx
 * @description Displays a dashboard of paired greenhouses and their environmental conditions.
 * Includes navigation to pair/edit greenhouses.
 * @author: SophiaJustin
 */
import React, { useState } from "react";
import "@/styles/pages/greenhouse.css";
import { useNavigate } from "react-router-dom";
import GreenhouseCard from "@/components/GreenhouseCard"; 
import greenhouse from "@/pages/viewmodels/Greenhouses.js";
import { Button } from "@/components/ui/Button";
import DeletePopUp from "@/components/DeletePopUp";

const GreenhousePage = () => {
  const navigate = useNavigate();

  const [selectedGreenhouse, setSelectedGreenhouse] = useState(null);
  const [showUnpairPopup, setShowUnpairPopup] = useState(false);

  // Called when "Unpair Greenhouse" is clicked
  const handleUnpair = (gh) => {
    setSelectedGreenhouse(gh);
    setShowUnpairPopup(true);
  };

  // Called when "Unpair" in popup is confirmed
  const handleConfirmUnpair = () => {
    console.log("Unpaired:", selectedGreenhouse.name);
    // TODO: implement backend unpairing logic here
    setShowUnpairPopup(false);
    setSelectedGreenhouse(null);
  };

  // Called when "Cancel" in popup is clicked
  const handleCancelUnpair = () => {
    setShowUnpairPopup(false);
    setSelectedGreenhouse(null);
  };
  return (
    <div className="greenhouse-page">
      <h2 className="section-title">Greenhouses</h2>
      <div className="action-buttons">
        <Button
          variant="default" 
          onClick={() => navigate('/pair-greenhouse')}
        >
          Pair Greenhouse
        </Button>

      </div>
   

      <div className="greenhouse-grid">
        {greenhouse.map((gh) => (
          <GreenhouseCard key={gh.id} greenhouse={gh} onUnpair={handleUnpair} />
        ))}
      </div>
      {showUnpairPopup && selectedGreenhouse && (
        <DeletePopUp
          title="Unpair Greenhouse?"
          description="unpair"
          nameLabel={selectedGreenhouse.name}
          confirmLabel="Unpair"
          onCancel={handleCancelUnpair}
          onConfirm={handleConfirmUnpair}
        />
      )}
    </div>
  );
};

export default GreenhousePage;
