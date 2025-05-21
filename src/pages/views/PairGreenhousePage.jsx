import React from "react";
import GreenhouseForm from "@/components/forms/GreenhouseForm";
import { useNavigate } from "react-router-dom";

const PairGreenhousePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      // Replace this with your actual backend API call
      // await GreenhouseAPI.pairGreenhouse(formData);

      console.log("Pairing greenhouse with data:", formData);
      navigate("/greenhouses");
    } catch (error) {
      console.error("Failed to pair greenhouse:", error);
      alert("Something went wrong while pairing.");
    }
  };

  return (
    <GreenhouseForm
      title="Pair greenhouse"
      submitLabel="Pair greenhouse"
      onSubmit={handleSubmit}
    />
  );
};

export default PairGreenhousePage;
