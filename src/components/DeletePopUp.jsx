import React from "react";
import "@/styles/components/delete_pop_up.css";
import { Button } from "@/components/ui/Button";

/**
 * Reusable confirmation popup for deletions and unpairing actions.
 *
 * @param {string} title - The main heading (e.g., "Delete preset?", "Unpair Greenhouse?")
 * @param {string} description - What the user is doing (e.g., "delete", "unpair")
 * @param {string} nameLabel - The name of the item (preset or greenhouse)
 * @param {JSX.Element} customMessage - Optional custom <p> content
 * @param {function} onCancel - Called when Cancel is clicked
 * @param {function} onConfirm - Called when Confirm is clicked
 * @param {string} confirmLabel - Custom text for the confirm button (e.g. "Unpair", "Delete")
 */

const DeletePopUp = ({
  title = "Delete preset?",
  description = "delete",
  nameLabel,
  customMessage,
  onCancel,
  onConfirm,
  confirmLabel = "Delete",
}) => {
  return (
    <div className="pop_up-overlay">
      <div className="pop_up">
        <div className="pop_up-icon">😟</div>
        <div className="pop_up-text">
          <h2 className="pop_up-heading">{title}</h2>
          <p>
            Are you sure you want to {description} <strong>{nameLabel}</strong>?
          </p>
          {customMessage || (
            <p>
              This will remove the {description.includes("unpair") ? "greenhouse" : "preset"} from your account.
              <br />
              You will no longer be able to{" "}
              {description.includes("unpair") ? "monitor or control it." : "choose it."}
            </p>
          )}
        </div>

        <div className="pop_up-buttons">
          <Button variant="cancel-light" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
