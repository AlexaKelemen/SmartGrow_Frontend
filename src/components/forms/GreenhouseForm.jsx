import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import "@/styles/components/greenhouseForm.css";

const GreenhouseForm = ({
  title,
  nameValue,
  macValue,
  showMacField = false, // <-- toggle field
  nameDisabled = false,
  onChange,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) {
      onChange((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <main className="pair-greenhouse-page">
      <h2>{title}</h2>
      <form className="pair-form" onSubmit={handleSubmit}>
        <label>
          Name of the greenhouse:
          <input
            type="text"
            name="name"
            value={nameValue}
            onChange={handleChange}
            disabled={nameDisabled}
            required
          />
        </label>

        {showMacField && (
          <label>
            MAC Address:
            <input
              type="text"
              name="macAddress"
              value={macValue}
              onChange={handleChange}
              required
            />
          </label>
        )}

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
  nameValue: PropTypes.string.isRequired,
  macValue: PropTypes.string,
  showMacField: PropTypes.bool,
  nameDisabled: PropTypes.bool,
  onCancel: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
};

export default GreenhouseForm;
