/**
 * @file dashboardModel.js
 * @description Model hook for transforming sensor API data into view-ready gauge props.
 *
 * Uses `useSensorReadings` to fetch the latest sensor data and safely maps them into value + config
 * objects for Temperature, Humidity, and Brightness gauges.
 *
 * This model currently hardcodes all min/max/ideal bounds until the backend API supports them.
 *
 * @see useSensorReadings
 * @see Dashboard.jsx
 * @author Taggerkov
 * @version 1.2.0
 * @since 0.5.0
 */

import { useSensor } from '@/hooks/api/useSensor.js';

import { useEffect, useState } from "react";


/**
 * Dashboard model to fetch and expose formatted sensor readings.
 */
export function dashboardModel(greenhouseId = 1) {
  const { getCurrentReadings, isLoading, error } = useSensor();
  const [latestReading, setLatestReading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrentReadings(greenhouseId);

        // Convert list of readings to an object with { type: value }
        const readingMap = {};
        for (const reading of data) {
          readingMap[reading.type] = reading.value;
        }

        setLatestReading(readingMap);
      } catch (err) {
        console.error("Failed to load dashboard sensor data:", err);
      }
    };

    fetchData();
  }, [getCurrentReadings, greenhouseId]);

  const safe = (key, fallback = 0) => latestReading?.[key] ?? fallback;

  return {
    isLoading,
    isError: !!error,
    getTemperatureReading: () => ({
      value: safe("AirTemperature"),
      min: 0,
      max: 40,
      minIdeal: 18,
      maxIdeal: 28,
    }),
    getHumidityReading: () => ({
      value: safe("SoilHumidity"),
      min: 0,
      max: 100,
      minIdeal: 60,
      maxIdeal: 80,
    }),
    getBrightnessReading: () => ({
      value: safe("Brightness"),
    }),
  };
}
