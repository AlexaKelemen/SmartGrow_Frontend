import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@/styles/pages/editPresetPage.css";
import { Button } from '@/components/ui/button';

const EditPresetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="edit-preset-page">
      <h2>Edit Preset</h2>

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

      <div className="button-group">
        
   <Button variant="cancel" onClick={() => navigate("/presets")}>Cancel</Button>
   <Button>Edit</Button>
      </div>
    </div>
  );
};

export default EditPresetPage;
