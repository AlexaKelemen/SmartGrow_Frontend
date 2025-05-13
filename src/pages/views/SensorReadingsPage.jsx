/*
 * @file SensorReadingsPage.jsx
 * @description Dashboard page for displaying the latest sensor readings in gauge format.
 * Dynamically visualizes air temperature, air humidity, soil humidity, and brightness using
 * react-gauge-chart components. Labels are color-coded based on sensor thresholds.
 *
 * This page is part of the SmartGrow application.
 *
 * @author AlexaKelemen
 * @since 1.0.0
 */

import React, { useEffect } from 'react';
import { useSensorReadingsModel } from '@/pages/viewmodels/SensorReadingsModel';
import GaugeChart from 'react-gauge-chart';
import "@/styles/pages/dashboard.css";

/**
 * Renders a gauge-based dashboard view for the most recent sensor readings.
 * Automatically loads the latest reading on mount.
 *
 * @returns {JSX.Element} Sensor dashboard with 4 gauges and color-coded labels.
 */
export default function SensorReadingsPage() {
  const { readings, loading, error, loadReadings } = useSensorReadingsModel();

  useEffect(() => {
    loadReadings(20); 
  }, []);


  const latest = readings?.[0];

   /**
   * Determines label color for air temperature.
   * @param {number} temp - Temperature value in °C
   * @returns {string} CSS class name
   */
    function getTempColor(temp) {
    if (temp < 15) return 'blue';      
  if (temp < 22) return 'green';      
  if (temp < 28) return 'yellow';    
  return 'red';      
  }
  /**
   * Determines label color for humidity (air or soil).
   * @param {number} humidity - Humidity percentage
   * @returns {string} CSS class name
   */
  function getHumidityColor(humidity) {
    if (humidity < 30) return 'red';         
  if (humidity < 50) return 'orange';      
  if (humidity < 75) return 'yellow';       
  return 'green';                           
}
 /**
   * Determines label color for light level (lux).
   * @param {number} lux - Brightness value in lux
   * @returns {string} CSS class name
   */
 function getBrightnessColor(lux) {
  if (lux < 200) return 'red';         
  if (lux < 500) return 'orange';       
  if (lux < 900) return 'yellow';       
  return 'green'; 
  }


  return (
    <div className="sensor-dashboard">
      <h1>Dashboard</h1>

      {latest && (
        <div className="gauges">
             <div className="gauge-block">
      <GaugeChart
        id="air-temperature"
        nrOfLevels={10}
        percent={Math.min(latest.airTemperature / 50, 1)} 
        arcWidth={0.45}                           
        colors={['#BA5959', '#D2D683', '#17DC24']} 
      />
      <div className={`label ${getTempColor(latest.airTemperature)}`}>Air Temperature</div>
    </div>
          <div className="gauge-block">
            <GaugeChart
              id="air-humidity"
              nrOfLevels={10}
              percent={latest.airHumidity / 100}
              arcWidth={0.45}                           
              colors={['#BA5959', '#D2D683', '#17DC24']} 
            />
            <div className={`label ${getHumidityColor(latest.airHumidity)}`}>Air Humidity</div>
          </div>

          <div className="gauge-block">
            <GaugeChart
              id="soil-humidity"
              nrOfLevels={10}
              percent={latest.soilHumidity / 100}
              arcWidth={0.45}                           
              colors={['#BA5959', '#D2D683', '#17DC24']} 
            />
            <div className={`label ${getHumidityColor(latest.soilHumidity)}`}>Soil Humidity</div>
          </div>

          <div className="gauge-block">
            <GaugeChart
              id="brightness"
              nrOfLevels={10}
              percent={Math.min(latest.lightLevel / 1000, 1)} 
              arcWidth={0.45}                          
              colors={['#BA5959', '#D2D683', '#17DC24']} 
            />
            <div className={`label ${getBrightnessColor(latest.lightLevel)}`}>Brightness</div>
          </div>
        </div>
      )}
    </div>
  );
}