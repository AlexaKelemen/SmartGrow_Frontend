import React from "react";
import "@/styles/components/delete_pop_up.css";
import { Button } from "@/components/ui/Button";

const DeletePopUp = ({
  title = "Delete preset?",
  description = "delete",
  nameLabel,
  confirmLabel = "Delete",
  customMessage,
  onCancel,
  onConfirm,
  testId = "popup",
}) => {
  return (
    <div className="pop_up-overlay">
      <div className="pop_up" data-testid={`${testId}-container`}>
        <div className="pop_up-icon" data-testid={`${testId}-icon`}>😟</div>

        <div className="pop_up-text">
          <h2 className="pop_up-heading" data-testid={`${testId}-title`}>
            {title}
          </h2>

          <p data-testid={`${testId}-message`}>
            Are you sure you want to {description} "{nameLabel}"?
          </p>

          {customMessage ? (
            <div data-testid={`${testId}-custom`}>{customMessage}</div>
          ) : (
            <p data-testid={`${testId}-info`}>
              This will remove the {description.includes("unpair") ? "greenhouse" : "preset"} from your account.
              You will no longer be able to{" "}
              {description.includes("unpair") ? "monitor or control it." : "choose it."}
            </p>
          )}
        </div>

        <div className="pop_up-buttons" data-testid={`${testId}-buttons`}>
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
