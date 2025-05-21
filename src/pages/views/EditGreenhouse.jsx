import React from "react";
import GreenhouseForm from "@/components/forms/GreenhouseForm";
import { useNavigate, useParams } from "react-router-dom";

const EditGreenhousePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (formData) => {
    try {
      // Replace this with your actual backend API call
      // await GreenhouseAPI.renameGreenhouse(id, formData);

      console.log("Saving changes to greenhouse:", formData);
      navigate("/greenhouses");
    } catch (error) {
      console.error("Failed to update greenhouse:", error);
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
