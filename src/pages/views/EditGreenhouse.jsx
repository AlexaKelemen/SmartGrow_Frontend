import React from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/pages/pairgreenhouse.css"; 
import { Button } from '@/components/ui/Button';

const EditGreenhouse = () => {
  const navigate = useNavigate();

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/greenhouses");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved changes to greenhouse");
    navigate("/greenhouses");
  };

  return (
    <main className="pair-greenhouse-page"> 
      <h2>Edit greenhouse</h2>

      <form className="pair-form" onSubmit={handleSubmit}>
        <label>
          Name of the greenhouse:
          <input type="text" name="greenhouseName" disabled />
        </label>

        <label>
          Something:
          <input type="text" name="something1" />
        </label>

        <label>
          Something:
          <input type="text" name="something2" />
        </label>

        <div className="pair-buttons">
        <Button variant="cancel" onClick={handleCancel}>Cancel</Button>
        <Button variant="default">Save changes</Button>
        </div>
      </form>
    </main>
  );
};

export default EditGreenhouse;
