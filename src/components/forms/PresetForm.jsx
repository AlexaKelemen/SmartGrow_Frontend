import React from "react";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "@/styles/components/presetForm.css";

const PresetForm = ({ mode, onSubmit }) => {
  const navigate = useNavigate();
  const isEdit = mode === "edit";

  return (
    <div className={isEdit ? "edit-preset-page" : "create-preset-form-page"}>
      <h2>{isEdit ? "Edit Preset" : "Create preset"}</h2>

      {!isEdit && (
        <div>
          <label>Name of the preset</label>
          <input type="text" placeholder="e.g. Tomato" />
        </div>
      )}

      <div className="input-row">
        <div>
          <label>Air humidity</label>
          <div className="input-pair">
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div>
        </div>

        <div>
          <label>Temperature humidity</label>
          <div className="input-pair">
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div>
        </div>
      </div>

      <div className="input-row">
        <div>
          <label>Soil humidity</label>
          <div className="input-pair">
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div>
        </div>

        <div>
          <label>Brightness</label>
          <div className="input-pair">
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div>
        </div>
      </div>

      <div className={isEdit ? "button-group" : "form-buttons"}>
        <Button variant="cancel" onClick={() => navigate("/presets")}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          {isEdit ? "Edit" : "Create"}
        </Button>
      </div>
    </div>
  );
};

PresetForm.propTypes = {
  mode: PropTypes.oneOf(["create", "edit"]).isRequired,
  onSubmit: PropTypes.func,
};

export default PresetForm;
