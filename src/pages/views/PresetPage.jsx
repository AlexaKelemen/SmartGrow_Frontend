import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/pages/preset.css"; 
import PresetCard from "@/components/PresetCard";
import DeletePopUp from "@/components/DeletePopUp";
import { Button } from "@/components/ui/Button";
import { usePreset } from "@/hooks/api/usePreset";

const PresetPage = () => {
  const navigate = useNavigate();
  const { getPreset, deletePreset, isLoading } = usePreset();

  const [preset, setPreset] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);

  useEffect(() => {
    const fetchPreset = async () => {
      try {
        const data = await getPreset(1); // hardcoded ID
        setPreset(data);
      } catch (error) {
        console.error("Error fetching preset with id 1:", error);
      }
    };

    fetchPreset();
  }, [getPreset]);

  const handleDeleteClick = () => {
    setSelectedPreset(preset);
    setShowPopUp(true);
  };

  const handleCancel = () => {
    setShowPopUp(false);
    setSelectedPreset(null);
  };

  const handleConfirm = async () => {
    try {
      await deletePreset(preset.id);
      console.log("Deleted:", preset.name);
      setPreset(null);
      setShowPopUp(false);
      setSelectedPreset(null);
    } catch (error) {
      console.error("Failed to delete preset:", error);
    }
  };

  return (
    <div className="preset-page">
      <div className="preset-header">
        <Button variant="default" onClick={() => navigate("/presets/create")}>
          Create Preset
        </Button>
      </div>

      {isLoading ? (
        <p>Loading preset...</p>
      ) : preset ? (
        <div className="preset-cards" onClick={() => navigate(`/presets/edit/${preset.id}`)}>
          <PresetCard preset={preset} onDelete={handleDeleteClick} />
        </div>
      ) : (
        <p>No preset found.</p>
      )}

      {showPopUp && selectedPreset && (
        <DeletePopUp
          title="Delete preset?"
          description="delete"
          nameLabel={selectedPreset.name}
          confirmLabel="Delete"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default PresetPage;
