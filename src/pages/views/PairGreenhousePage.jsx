import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@/styles/pages/pairgreenhouse.css"; 
import { Button } from "@/components/ui/Button";

const PairGreenhousePage = () => {
  const navigate = useNavigate();

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/greenhouses");
  };
  return (
    <main className="pair-greenhouse-page">
  <h2>Pair greenhouse</h2>

  <form className="pair-form">
    <label>
      Name of the greenhouse:
      <input type="text" name="greenhouseName" required />
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
  <Button variant="cancel" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="default">
            Pair greenhouse
          </Button>
    </div>
  </form>
</main>

  );
};

export default PairGreenhousePage;
