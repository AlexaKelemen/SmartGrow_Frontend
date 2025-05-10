/**
 * @file SoilHumidityPage.jsx
 * @description Displays soil humidity levels with a placeholder chart for past and predicted values,
 *  and a reminder box showing the next watering time.
 * @author: SophiaJustin
 */

import React from 'react';
import '@/styles/pages/soilhumidity.css';

const SoilHumidityPage = () => {
  return (
    <main className="humidity-page">
      <h2 className="page-title">Soil Humidity Levels</h2>

      <div className="humidity-content">
        <div className="chart-container">
          <div className="placeholder-graph">
            <div className="label past-label">Past Soil Humidity Levels</div>
            <div className="label predicted-label">Predicted Soil Humidity Levels</div>
            <div className="graph-placeholder-text">[ Graph placeholder – Replace with actual chart ]</div>
          </div>
        </div>

        <div className="reminder-card">
          <h4>Next Watering - 2:30 AM</h4>
          <p>
            Remember to please fill the Water Tank before 2:30 AM to ensure that the Automatic watering will succeed.
          </p>
        </div>
      </div>
    </main>
  );
};

export default SoilHumidityPage;
