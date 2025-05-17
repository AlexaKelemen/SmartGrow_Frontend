import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import "@/styles/components/greenhouseForm.css";

const GreenhouseForm = ({
  title,
  nameValue = "",
  nameDisabled = false,
  something1 = "",
  something2 = "",
  onCancel,
  onSubmit,
  submitLabel
}) => {
  const navigate = useNavigate();

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel ? onCancel() : navigate("/greenhouses");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <main className="pair-greenhouse-page">
      <h2>{title}</h2>
      <form className="pair-form" onSubmit={handleSubmit}>
        <label>
          Name of the greenhouse:
          <input type="text" name="greenhouseName" defaultValue={nameValue} disabled={nameDisabled} required />
        </label>

        <label>
          Something:
          <input type="text" name="something1" defaultValue={something1} />
        </label>

        <label>
          Something:
          <input type="text" name="something2" defaultValue={something2} />
        </label>

        <div className="pair-buttons">
          <Button variant="cancel" onClick={handleCancel}>Cancel</Button>
          <Button type="submit" variant="default">{submitLabel}</Button>
        </div>
      </form>
    </main>
  );
};

GreenhouseForm.propTypes = {
  title: PropTypes.string.isRequired,
  nameValue: PropTypes.string,
  nameDisabled: PropTypes.bool,
  something1: PropTypes.string,
  something2: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string.isRequired
};

export default GreenhouseForm;
