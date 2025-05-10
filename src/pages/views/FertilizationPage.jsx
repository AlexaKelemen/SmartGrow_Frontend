
/**
 * @file FertilizationPage.jsx
 * @description Fertilization scheduling allowing users to schedule one-time fertilization.
 * Displays last fertilization date and time selection with toggle.
 * @author SophiaJustin
 */

import React, { useState } from 'react';
import useRealTime from '../viewmodels/DateTime.js';
import "@/styles/pages/fertilization.css";

const FertilizationPage = () => {
  const currentDate = useRealTime();

  const [scheduled, setScheduled] = useState(true);
  const [selectedDate, setSelectedDate] = useState("2024-06-10");
  const [selectedTime, setSelectedTime] = useState("09:41");

  return (
    <div className="fertilization-container">
      <div className="left-panel">
        <div className="date-display">
          <span className="day">
            {currentDate.toLocaleDateString("en-DK", { weekday: "short", month: "short" })}
          </span>
          <br />
          <span className="date">{currentDate.getDate()}</span>
        </div>
        <div className="info-card">
          <span className="info-icon">ℹ️</span> Your last fertilization
        </div>
      </div>

      <div className="right-panel">
        <div className="schedule-card">
          <h3>Scheduled fertilization</h3>
          <p>
            After selecting the time and date of the fertilization, the system will fertilize
            on that date at that time. Later to implement repeating scheduled fertilization,
            so it does it per X days on the Y hour.
          </p>
          <label className="switch">
            <input
              type="checkbox"
              checked={scheduled}
              onChange={() => setScheduled(!scheduled)}
            />
            <span className="slider round"></span>
          </label>
          <div className="datetime-inputs">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>
        </div>
        <button className="fertilize-btn">⚠️ Fertilize</button>
      </div>
    </div>
  );
};

export default FertilizationPage;
