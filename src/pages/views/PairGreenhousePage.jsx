import React from "react";
import "@/styles/pages/pairgreenhouse.css"; 

const PairGreenhousePage = () => {
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

    <button type="submit" className="submit-button">Pair greenhouse</button>
  </form>
</main>

  );
};

export default PairGreenhousePage;
