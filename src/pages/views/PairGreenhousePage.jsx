import React from "react";
import GreenhouseForm from "@/components/forms/GreenhouseForm";

const PairGreenhousePage = () => {
  const handleSubmit = () => {
    console.log("Pairing greenhouse...");
    // TODO: Add logic
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
