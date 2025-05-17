import React from "react";
import PresetForm from "@/components/forms/PresetForm"; 


const CreatePresetForm = () => {
  const handleSubmit = () => {
    console.log("Creating preset...");
    // TODO: Backend logic
  };

  return <PresetForm mode="create" onSubmit={handleSubmit} />;
};

export default CreatePresetForm;
