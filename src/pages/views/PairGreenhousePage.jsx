import React from "react";
import GreenhouseForm from "@/components/forms/GreenhouseForm";
import { useNavigate } from "react-router-dom";
import { useGreenhouse } from "@/hooks/api/useGreenhouse";

const PairGreenhousePage = () => {
  const navigate = useNavigate();
  const { pair, error } = useGreenhouse();

  const handleSubmit = async (formData) => {
    try {
      await pair(formData); 
      navigate("/greenhouses");
    } catch (err) {
      console.error("Failed to pair greenhouse:", err);
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
