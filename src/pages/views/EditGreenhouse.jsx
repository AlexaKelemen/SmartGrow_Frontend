import React from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/pages/pairgreenhouse.css"; 

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
    <main className="pair-greenhouse-page"> {/* ✅ reuse same structure */}
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

        <div className="pair-buttons"> {/* ✅ same button wrapper as Pair page */}
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="save-button">Save changes</button>
        </div>
      </form>
    </main>
  );
};

export default EditGreenhouse;
