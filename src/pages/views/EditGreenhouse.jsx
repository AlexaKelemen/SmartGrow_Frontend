import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GreenhouseForm from "@/components/forms/GreenhouseForm";

const EditGreenhouse = () => {
  const { id } = useParams(); // Get ID from URL
  const [form, setForm] = useState({ name: "" });

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/Greenhouse/rename/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name }),
      });

      if (res.ok) {
        alert("Greenhouse renamed successfully.");
      } else if (res.status === 409) {
        alert("That name is already taken.");
      } else {
        alert("Rename failed.");
      }
    } catch (err) {
      console.error("Rename error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <GreenhouseForm
      title="Edit Greenhouse"
      nameValue={form.name}
      showMacField={false}
      nameDisabled={false}
      submitLabel="Save Changes"
      onChange={setForm}
      onSubmit={handleSubmit}
    />
  );
};

export default EditGreenhouse;
