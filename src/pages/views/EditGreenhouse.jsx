import React from "react";
import GreenhouseForm from "@/components/forms/GreenhouseForm";
import { useNavigate, useParams } from "react-router-dom";
import { useGreenhouse } from "@/hooks/api/useGreenhouse";

const EditGreenhousePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rename, error, isLoading } = useGreenhouse();

  const handleSubmit = async (formData) => {
    try {
      await rename({ id: Number(id), name: formData.name });
      navigate("/greenhouses");
    } catch (err) {
      console.error("Failed to update greenhouse:", err);
      alert("Failed to save changes.");
    }
  };

  return (
    <GreenhouseForm
      title="Edit greenhouse"
      submitLabel="Save changes"
      nameDisabled={false}
      showMacField={false} 
      onSubmit={handleSubmit}
    />
  );
};

export default EditGreenhousePage;
