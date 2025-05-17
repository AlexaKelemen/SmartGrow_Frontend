import React from "react";
import GreenhouseForm from "@/components/forms/GreenhouseForm";

const EditGreenhouse = () => {
  const handleSubmit = () => {
    console.log("Saved changes to greenhouse");
    // TODO: Add logic
  };

  return (
    <GreenhouseForm
      title="Edit greenhouse"
      nameValue="StrawberryHouse"
      nameDisabled={true}
      submitLabel="Save changes"
      onSubmit={handleSubmit}
    />
  );
};

export default EditGreenhouse;
