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
import { Button } from "@/components/ui/Button";
import DeletePopUp from "@/components/DeletePopUp";
import { useGreenhouse } from "@/hooks/api/useGreenhouse";
import { usePreset } from "@/hooks/api/usePreset";

const GreenhousePage = () => {
  const navigate = useNavigate();
  const {getAll, unpair,assignPreset,configure,predict, error, isLoading } = useGreenhouse(); 
  const { getAllPresets } = usePreset();
  const [allPresets, setAllPresets] = useState([]);
  const [greenhouseList, setGreenhouseList] = useState([]);
  const [selectedGreenhouse, setSelectedGreenhouse] = useState(null);
  const [showUnpairPopup, setShowUnpairPopup] = useState(false);
 
  useEffect(() => {
    getAll().then(setGreenhouseList).catch(console.error);
  }, []);

  useEffect(() => {
    getAllPresets().then(setAllPresets).catch(console.error);
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
    // Actions
    const handleConfigure = (greenhouseId, configId, payload) => {
      return configure(greenhouseId, configId, payload);
    };
    
    const handleApplyPreset = async (greenhouseId, presetId) => {
      try {
        await assignPreset(greenhouseId, presetId);
        alert(`Preset ${presetId} applied to Greenhouse ${greenhouseId}`);
      } catch (err) {
        console.error("Failed to apply preset:", err);
        alert("Failed to apply preset.");
      }
    };

    return (
      <div className="greenhouse-page">
        <h2 className="section-title">Greenhouses</h2>
  
        <div className="action-buttons">
          <Button variant="default" onClick={() => navigate("/pair-greenhouse")}>
            Pair Greenhouse
          </Button>
        </div>
  
        <div className="greenhouse-grid">
          {greenhouseList.map((gh) => (
            <div key={gh.id} className="greenhouse-wrapper">
              <GreenhouseCard greenhouse={gh} onUnpair={handleUnpair} onConfigure={handleConfigure}  presets={allPresets}
               onApplyPreset={handleApplyPreset}/>
  
            
            </div>
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
