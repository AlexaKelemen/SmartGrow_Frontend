import React from "react";
import { useParams } from "react-router-dom";
import "@/styles/pages/greenhouse-logs.css"; // You'll create this

// Dummy log data for now
const logs = [
  { type: "Watered", description: "Plants were watered", date: "2025-05-12" },
  { type: "Fertilized", description: "Used organic fertilizer", date: "2025-05-10" },
  { type: "Light Adjusted", description: "Increased lighting by 10%", date: "2025-05-08" },
  { type: "Humidity Checked", description: "Humidity normal", date: "2025-05-06" },
  { type: "Pest Control", description: "Applied pest spray", date: "2025-05-04" },
  { type: "Pruned", description: "Removed dead leaves", date: "2025-05-02" },
];

const GreenhouseLogs = () => {
  const { id } = useParams(); // Example: /greenhouse-logs/1

  const greenhouseName = `Greenhouse ${id}`; // Replace with actual name if needed

  return (
    <main className="logs-page">
      <h2>{greenhouseName}’s Logs</h2>

      <div className="log-list">
        {logs.map((log, index) => (
          <div key={index} className="log-entry">
            <div className="log-type">{log.type}</div>
            <div className="log-desc">{log.description}</div>
            <div className="log-date">{log.date}</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GreenhouseLogs;
