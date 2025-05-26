import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useSensor } from '@/hooks/api/useSensor';
import { useGreenhouse } from '@/hooks/api/useGreenhouse';
import '@/styles/pages/soilhumidity.css';

const SoilHumidityPage = () => {
  const { id } = useParams();
  const greenhouseId = Number(id);
  const { getPastReadings } = useSensor();
  const { predict } = useGreenhouse();

  const [pastData, setPastData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const past = await getPastReadings(greenhouseId, { readingType: 'SoilHumidity' });
        const mappedPast = past.map((entry) => ({
          time: new Date(entry.timestamp).toISOString(),
          value: entry.value,
        }));
        setPastData(mappedPast);
        const response = await predict(greenhouseId);
        const forecast = response.forecast; 
        console.log("Forecast returned:", forecast);
        
        const now = new Date();
        const mappedForecast = forecast.map((value, index) => ({
          time: new Date(now.getTime() + (index + 1) * 60000).toISOString(),
          value: value,
        }));
       
        setPredictedData(mappedForecast);
      } catch (err) {
        console.error('Failed to fetch soil humidity data:', err);
      }
    };

    if (!isNaN(greenhouseId)) {
      fetchData();
    }
  }, [greenhouseId]);

  return (
    <main className="humidity-page">
      <h2 className="page-title">Soil Humidity Levels</h2>

      <div className="humidity-content">
        <div className="chart-container">
          <h3>Past Soil Humidity</h3>
          {pastData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={pastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickFormatter={(str) =>
                    new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                />
                <YAxis
                  domain={[0, 100]}
                  label={{ value: '%', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                  formatter={(val) => [`${val.toFixed(1)}%`, 'Soil Humidity']}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No past data available.</p>
          )}
        </div>

        <div className="chart-container">
          <h3>Predicted Soil Humidity</h3>
          {predictedData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={predictedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickFormatter={(str) =>
                    new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                />
                <YAxis
                  domain={[0, 100]}
                  label={{ value: '%', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                  formatter={(val) => [`${val.toFixed(1)}%`, 'Predicted']}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No prediction data available.</p>
          )}
        </div>

        <div className="reminder-card">
          <h4>Next Watering - 2:30 AM</h4>
          <p>Fill the tank before 2:30 AM to ensure automatic watering succeeds.</p>
        </div>
      </div>
    </main>
  );
};

export default SoilHumidityPage;
