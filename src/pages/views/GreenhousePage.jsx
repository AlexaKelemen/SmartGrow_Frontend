/**
 * @file GreenhousePage.jsx
 * @description Displays a dashboard of paired greenhouses and their environmental conditions.
 * Includes navigation to pair/edit greenhouses.
 * @author: SophiaJustin,Alexa Kelemen
 */
import React, { useState, useEffect } from "react";
import "@/styles/pages/greenhouse.css";
import { useNavigate } from "react-router-dom";
import GreenhouseCard from "@/components/GreenhouseCard"; 
//import greenhouse from "@/pages/viewmodels/Greenhouses.js";
import { Button } from "@/components/ui/Button";
import DeletePopUp from "@/components/DeletePopUp";
import { useGreenhouse } from "@/hooks/api/useGreenhouse";

const GreenhousePage = () => {
  const navigate = useNavigate();
  const {getAll, unpair, error, isLoading } = useGreenhouse(); 

  const [greenhouseList, setGreenhouseList] = useState([]);
  const [selectedGreenhouse, setSelectedGreenhouse] = useState(null);
  const [showUnpairPopup, setShowUnpairPopup] = useState(false);
 
  useEffect(() => {
    getAll().then(setGreenhouseList).catch(console.error);
  }, []);



  // Called when "Unpair Greenhouse" is clicked
  const handleUnpair = (gh) => {
    setSelectedGreenhouse(gh);
    setShowUnpairPopup(true);
  };

  // Called when "Unpair" in popup is confirmed
  const handleConfirmUnpair = async () => {
    try {
      await unpair(selectedGreenhouse.id);
      setGreenhouseList(prev =>
        prev.filter((gh) => gh.id !== selectedGreenhouse.id)
      );
      console.log("Unpaired:", selectedGreenhouse.name);
    } catch (err) {
      console.error("Failed to unpair:", err);
      alert("Failed to unpair greenhouse.");
    } finally {
      setShowUnpairPopup(false);
      setSelectedGreenhouse(null);
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
        {greenhouseList.map((gh) => (
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
