/**
 * @file SoilHumidityPage.jsx
 * @description Displays soil humidity levels with a placeholder chart for past and predicted values,
 *  and a reminder box showing the next watering time.
 * @author: SophiaJustin, Alexa Kelemen
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { SensorAPI, GreenhouseAPI } from '@/api/restApi';
import '@/styles/pages/soilhumidity.css';


const SoilHumidityPage = () => {
  const { id } = useParams();
  const greenhouseId = Number(id);
  const [pastData, setPastData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);

  useEffect(() => {
    // Fetch past sensor data
    SensorAPI.getPastReadings(greenhouseId, { readingType: 'SoilHumidity' })
      .then((data) => {
        const mapped = data.map((item) => ({
          time: new Date(item.timestamp).toLocaleString(),
          past: item.value,
        }));
        setPastData(mapped);
      })
      .catch(console.error);

    // Fetch prediction
    GreenhouseAPI.predict(greenhouseId)
      .then((forecast) => {
        const mapped = forecast.map((value, index) => ({
          time: `T+${index}`,
          predicted: value,
        }));
        setPredictedData(mapped);
      })
      .catch(console.error);
  }, [greenhouseId]);

  const combinedData = [...pastData, ...predictedData];

  return (
    <main className="humidity-page">
      <h2 className="page-title">Soil Humidity Levels</h2>

      <div className="humidity-content">
        <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
  <LineChart data={[...pastData, ...predictedData]}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" tickFormatter={(str) => str.slice(11, 16)} />
    <YAxis label={{ value: '% Soil Humidity', angle: -90, position: 'insideLeft' }} />
    <Tooltip />
    <Legend verticalAlign="top" height={36} />

    {/* Past Soil Humidity */}
    <Line
      type="monotone"
      dataKey="past"
      name="Past Soil Humidity"
      stroke="#8884d8"
      strokeWidth={2}
      dot={{ r: 2 }}
      isAnimationActive={false}
    />

    {/* Predicted Soil Humidity */}
    <Line
      type="monotone"
      dataKey="predicted"
      name="Predicted Soil Humidity"
      stroke="#82ca9d"
      strokeDasharray="5 5"
      strokeWidth={2}
      dot={{ r: 2 }}
      isAnimationActive={false}
    />

    {/* Optional: Divider Line (where prediction starts) */}
    {pastData.length > 0 && (
      <ReferenceLine
        x={pastData[pastData.length - 1].time}
        stroke="gray"
        strokeDasharray="3 3"
        label={{ value: "Now", position: "insideTop", fill: "gray" }}
      />
    )}
  </LineChart>
</ResponsiveContainer>
</div>
      </div>
    </main>
  );
};

export default SoilHumidityPage;
