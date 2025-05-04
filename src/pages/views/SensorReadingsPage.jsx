import React, { useEffect } from 'react';
import { useSensorReadingsModel } from '@/pages/viewmodels/SensorReadingsModel';
import GaugeChart from 'react-gauge-chart';
import "@/styles/pages/dashboard.css";

export default function SensorReadingsPage() {
  const { readings, loading, error, loadReadings } = useSensorReadingsModel();

  useEffect(() => {
    loadReadings(20); 
  }, []);

  // ✅ Define "latest" reading from array
  const latest = readings?.[0];

  return (
    <div className="sensor-dashboard">
      <h1>Dashboard</h1>

      {latest && (
        <div className="gauges">
          <div className="gauge-block">
            <GaugeChart
              id="air-humidity"
              nrOfLevels={10}
              percent={latest.airHumidity / 100}
            />
            <div className="label red">Air Humidity</div>
          </div>

          <div className="gauge-block">
            <GaugeChart
              id="soil-humidity"
              nrOfLevels={10}
              percent={latest.soilHumidity / 100}
            />
            <div className="label green">Soil Humidity</div>
          </div>

          <div className="gauge-block">
            <GaugeChart
              id="brightness"
              nrOfLevels={10}
              percent={Math.min(latest.lightLevel / 1000, 1)} 
            />
            <div className="label yellow">Brightness</div>
          </div>
        </div>
      )}
    </div>
  );
}
