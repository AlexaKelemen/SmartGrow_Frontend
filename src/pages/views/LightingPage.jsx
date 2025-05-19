/**
 * @file LightingPage.jsx
 * @description A UI page that allows the user to manage lighting settings either automatically or based on a schedule.
 * @author SophiaJustin
 */

import useRealTime from "../viewmodels/DateTime.js"; // Custom hook to get real-time date and time
import React, { useState } from 'react';
import "@/styles/pages/lighting.css"; // Styles specific to the lighting page
import { GaugeHumidity, GaugeBrightness } from "@/components/gauges/wrappers";

const LightingPage = () => {
  const currentDate = useRealTime(); // Gets live updating current date and time

  // === State Management ===
  const [autoLighting, setAutoLighting] = useState(false); // Auto lighting toggle
  const [scheduledLighting, setScheduledLighting] = useState(true); // Scheduled lighting toggle
  const [startTime, setStartTime] = useState("09:00"); // Start time for scheduled lighting
  const [endTime, setEndTime] = useState("17:00"); // End time for scheduled lighting

  // === Handlers to ensure only one lighting mode is active at a time ===
  const handleAutoToggle = () => {
    setAutoLighting(true);
    setScheduledLighting(false);
  };

  const handleScheduledToggle = () => {
    setScheduledLighting(true);
    setAutoLighting(false);
  };

  return (
    <div className="lighting-container">
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

        <GaugeBrightness value={72} min={0} max={100} />
        <div className="brightness-label">Brightness</div>
      </div>

      {/* === Right Panel: Lighting Controls === */}
      <div className="right-panel">
        {/* Automated Lighting Card */}
        <div className="card">
          <h3>Automated Lighting</h3>
          <p>
            When toggled on, the system automates lighting, turning it on at minimum
            soil humidity and off at maximum.
          </p>
          <label className="switch">
            <input
              type="checkbox"
              checked={autoLighting}
              onChange={handleAutoToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <hr className="divider" />

        {/* Scheduled Lighting Card */}
        <div className="card">
          <h3>Scheduled Lighting</h3>
          <p>
            After selecting the time of the lighting, the system will turn On/Off the
            light at the set time.
          </p>
          <div className="time-inputs">
            <label>
              From:
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>
            <label>
              To:
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={scheduledLighting}
              onChange={handleScheduledToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>

        {/* Manual Override Button */}
        <button className="toggle-btn">💡 Toggle</button>
      </div>
    </div>
  );
};

export default LightingPage;

