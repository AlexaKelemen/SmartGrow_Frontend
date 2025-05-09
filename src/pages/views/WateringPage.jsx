/**
 * @file FertilizationPage.jsx
 * @description Watering scheduling allowing users to schedule when the greenhouse get watered.
 * It lets the user manage when watering happens whether it's automatically or scheduled.
 * @author SophiaJustin
 */

import React, { useState } from 'react';
import useRealTime from '../viewmodels/DateTime.js';
import "@/styles/pages/watering.css";

const WateringPage = () => {
    const currentDate = useRealTime(); // Gets live updating current date and time
  
    // === State Management ===
    const [autoWatering, setAutoWatering] = useState(false); // Auto watering toggle
    const [scheduledWatering, setScheduledWatering] = useState(true); // Scheduled watering toggle
    const [selectedDate, setSelectedDate] = useState("2024-06-10");
    const [selectedTime, setSelectedTime] = useState("09:41");

    // === Handlers to ensure only one watering mode is active at a time ===
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
        {/* === Left Panel: Date and Brightness Gauge === */}
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
  
        {/* === Right Panel: Watering Controls === */}
        <div className="right-panel">
          {/* Automated Watering Card */}
          <div className="card">
            <h3>Automated Watering</h3>
            <p>
             After pressing the 'Water' button, system waters plant until it reaches max soil humidity set in the configured preset.
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
  
          {/* Scheduled Watering Card */}
          <div className="right-panel">
            <div className="schedule-card">
            <h3>Scheduled Watering</h3>
            <p>
              After selecting the time and date of the watering, the system will water on that date at that time.
              Later to implement repeating schedule watering, so the system does it per X days on the Y hour.
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
        </div>
  
          {/* Manual Override Button */}
        <button className="toggle-btn">💧 Water</button>
        </div>
      </div>
      </div>
    );
  };
  
  export default WateringPage;
  