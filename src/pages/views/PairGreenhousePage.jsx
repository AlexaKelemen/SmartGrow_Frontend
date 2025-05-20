import React, { useState } from "react";
import GreenhouseForm from "@/components/forms/GreenhouseForm";

const PairGreenhousePage = () => {
  const [form, setForm] = useState({ name: "", macAddress: "" });

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/Greenhouse/pair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 201) {
        const data = await res.json();
        alert(`Greenhouse "${data.name}" paired successfully!`);
      } else if (res.status === 409) {
        alert("A greenhouse with this name already exists.");
      } else {
        alert("An error occurred while pairing.");
      }
    } catch (err) {
      console.error("Failed to pair greenhouse:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <GreenhouseForm
      title="Pair Greenhouse"
      nameValue={form.name}
      macValue={form.macAddress}
      showMacField={true}
      submitLabel="Pair"
      onChange={setForm}
      onSubmit={handleSubmit}
    />
  );
};

export default PairGreenhousePage;
