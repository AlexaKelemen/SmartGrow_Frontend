/**
 * @file GreenhousePage.jsx
 * @description Displays a dashboard of paired greenhouses and their environmental conditions.
 * Includes navigation to pair/edit greenhouses.
 * @author: SophiaJustin
 */
import React, { useState,useEffect } from "react";
import "@/styles/pages/greenhouse.css";
import { useNavigate } from "react-router-dom";
import GreenhouseCard from "@/components/GreenhouseCard"; 
//import greenhouse from "@/pages/viewmodels/Greenhouses.js";
import { Button } from "@/components/ui/Button";
import DeletePopUp from "@/components/DeletePopUp";

const GreenhousePage = () => {
  const navigate = useNavigate();

  const [greenhouses, setGreenhouses] = useState([]);
  const [selectedGreenhouse, setSelectedGreenhouse] = useState(null);
  const [showUnpairPopup, setShowUnpairPopup] = useState(false);

    // Fetch greenhouses from mocked or real API
  useEffect(() => {
    const fetchGreenhouses = async () => {
      try {
        const res = await fetch("/api/Greenhouse");
        const data = await res.json();
        setGreenhouses(data);
      } catch (err) {
        console.error("Failed to fetch greenhouses:", err);
      }
    };
    fetchGreenhouses();
  }, []);

  // Called when "Unpair Greenhouse" is clicked
  const handleUnpair = (gh) => {
    setSelectedGreenhouse(gh);
    setShowUnpairPopup(true);
  };

  // Called when "Unpair" in popup is confirmed
  const handleConfirmUnpair = async () => {
    try {
      await fetch(`/api/Greenhouse/unpair/${selectedGreenhouse.id}`, {
        method: "POST"
      });

      // Remove from list after success
      setGreenhouses(prev => prev.filter(g => g.id !== selectedGreenhouse.id));
      setShowUnpairPopup(false);
      setSelectedGreenhouse(null);
    } catch (err) {
      console.error("Failed to unpair greenhouse:", err);
    }
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
        {greenhouses.map((gh) => (
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
