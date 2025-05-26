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
 * @author Taggerkov, SophiaJustin
 * @version 1.2.0
 * @since 0.5.0
 */

import { useSensor } from '@/hooks/api/useSensor';

import { useEffect, useState } from "react";

export function dashboardModel(greenhouseId) {
  const { getCurrentReadings, isLoading, error } = useSensor();
  const [latestReading, setLatestReading] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const readings = await getCurrentReadings(greenhouseId);
        const mapped = {};
        readings.forEach(r => {
          mapped[r.type.toLowerCase()] = r.value;
        });
        setLatestReading(mapped);
      } catch (err) {
        console.error("Failed to load dashboard sensor data:", err);
      }
    }

    fetchData();
  }, [greenhouseId, getCurrentReadings]);

  const safe = (key, fallback = 0) => latestReading?.[key] ?? fallback;

  return {
    isLoading,
    isError: error,
    getTemperatureReading: () => ({ value: safe('airtemperature'), min: 0, max: 40, minIdeal: 18, maxIdeal: 28 }),
    getHumidityReading: () => ({ value: safe('soilhumidity'), min: 0, max: 100, minIdeal: 60, maxIdeal: 80 }),
    getBrightnessReading: () => ({ value: safe('brightness') }),
  };
}
