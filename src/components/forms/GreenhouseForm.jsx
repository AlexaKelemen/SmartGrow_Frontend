import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import "@/styles/components/greenhouseForm.css";

/**
 * @component GreenhouseForm
 * @description Form for pairing or editing a greenhouse.
 *
 * @param {Object} props
 * @param {string} props.title - Title of the form (e.g., "Pair Greenhouse", "Edit Greenhouse")
 * @param {string} props.nameValue - Initial value for the greenhouse name
 * @param {boolean} props.nameDisabled - Whether the greenhouse name field is editable
 * @param {string} props.macValue - Initial value for the MAC address (used only when pairing)
 * @param {boolean} props.macDisabled - Whether MAC address is editable
 * @param {boolean} props.showMacField - Whether to show the MAC address input field
 * @param {function} props.onSubmit - Function to handle form submission
 * @param {function} props.onCancel - Function to handle cancel button
 * @param {string} props.submitLabel - Label for the submit button
 */
const GreenhouseForm = ({
  title,
  nameValue = "",
  nameDisabled = false,
  macValue = "",
  macDisabled = false,
  showMacField = false,
  onCancel,
  onSubmit,
  submitLabel
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState(nameValue);
  const [macAddress, setMacAddress] = useState(macValue);

  const handleCancel = (e) => {
    e.preventDefault();
    if (onCancel) {
      onCancel();
    } else {
      navigate("/greenhouses");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, macAddress };
    onSubmit(formData);
  };

  return (
    <main className="pair-greenhouse-page">
      <h2>{title}</h2>
      <form className="pair-form" onSubmit={handleSubmit}>
        <label>
          Name of the greenhouse:
          <input
            type="text"
            name="greenhouseName"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
              disabled={macDisabled}
              required
            />
          </label>
        )}

        <div className="pair-buttons">
          <Button variant="cancel" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="default">
            {submitLabel}
          </Button>
        </div>
      </form>
    </main>
  );
};

GreenhouseForm.propTypes = {
  title: PropTypes.string.isRequired,
  nameValue: PropTypes.string,
  nameDisabled: PropTypes.bool,
  macValue: PropTypes.string,
  macDisabled: PropTypes.bool,
  showMacField: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired
};

export default GreenhouseForm;
