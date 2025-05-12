/**
 * @file WateringPage.jsx
 * @description Watering scheduling allowing users to schedule when the greenhouse get watered.
 * It lets the user manage when watering happens whether it's automatically or scheduled.
 * @author SophiaJustin
 */

import React, { useState } from 'react';
import useRealTime from '../viewmodels/DateTime.js';
import "@/styles/pages/watering.css";


const WateringPage = () => {
  const currentDate = useRealTime();

  // === State Management ===
  const [autoWatering, setAutoWatering] = useState(false);
  const [scheduledWatering, setScheduledWatering] = useState(true);
  const [selectedDate, setSelectedDate] = useState("2024-06-10");
  const [selectedTime, setSelectedTime] = useState("09:41");
  const [repeatInterval, setRepeatInterval] = useState(3); // Repeat every X days

  const handleAutoToggle = () => {
    setAutoWatering(true);
    setScheduledWatering(false);
  };

  const handleScheduledToggle = () => {
    setScheduledWatering(true);
    setAutoWatering(false);
  };

  return (
    <div className="watering-container">
      {/* === Left Panel === */}
      <div className="left-panel">
        <div className="date-display">
          {currentDate.toLocaleDateString("en-DK", {
            weekday: "short",
            month: "short",
          })}
          <br />
          <span>{currentDate.getDate()}</span>
        </div>

        <div className="gauge-placeholder">😊</div>
        <div className="humidity-label">Soil humidity</div>
      </div>

      {/* === Right Panel === */}
      <div className="right-panel">
        {/* Automated Watering */}
        <div className="card">
          <h3>Automated Watering</h3>
          <p>
            After pressing the  &apos;Water&apos; button, the system waters the plant until
            it reaches max soil humidity based on the preset.
          </p>
          <label className="switch">
            <input
              type="checkbox"
              checked={autoWatering}
              onChange={handleAutoToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <hr className="divider" />

        {/* Scheduled Watering */}
        <div className="schedule-card">
          <h3>Scheduled Watering</h3>
          <p>
            Select a time and date for watering. You can also choose to repeat
            watering every X days at the selected hour.
          </p>
          <label className="switch">
            <input
              type="checkbox"
              checked={scheduledWatering}
              onChange={handleScheduledToggle}
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

          {/* Repeat Interval Input */}
          {scheduledWatering && (
            <div className="repeat-container">
              <label htmlFor="repeat-days">Repeat every</label>
              <input
                type="number"
                id="repeat-days"
                min="1"
                value={repeatInterval}
                onChange={(e) => setRepeatInterval(e.target.value)}
              />
              <span>days</span>
            </div>
          )}
        </div>

        <button className="toggle-btn">💧 Water</button>
      </div>
    </div>
  );
};

export default WateringPage;
