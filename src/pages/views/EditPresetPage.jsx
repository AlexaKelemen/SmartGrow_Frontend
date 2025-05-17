import React from "react";
import { useParams } from "react-router-dom";
import PresetForm from "@/components/forms/PresetForm"; 


const EditPresetPage = () => {
  const { id } = useParams();

  const handleSubmit = () => {
    console.log(`Editing preset with id ${id}...`);
    // TODO: Backend update logic
  };

  return <PresetForm mode="edit" onSubmit={handleSubmit} />;
};

export default EditPresetPage;
