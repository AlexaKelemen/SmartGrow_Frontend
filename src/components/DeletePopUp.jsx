import React ,{ useState } from "react";
import "@/styles/components/delete_pop_up.css"; 

const DeletePopUp = ({ presetName, onCancel, onConfirm }) => {
  return (
    <div className="pop_up-overlay">
      <div className="pop_up">
        <div className="pop_up-icon">😟</div>
        <div className="pop_up-text">
        <h2 className="pop_up-heading">Delete preset?</h2>
        <p>Are you sure you want to delete <strong>{presetName}</strong> preset?</p>
        <p>This will remove the preset from your account.<br />You will no longer be able to choose it.</p>
      </div>
        <div className="pop_up-buttons">
          <button className="pop-cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="pop-delete-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;