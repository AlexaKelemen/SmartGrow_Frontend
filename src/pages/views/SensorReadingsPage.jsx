import React, { useEffect } from 'react';
import { useSensorReadingsModel } from '@/pages/viewmodels/SensorReadingsModel';
import GaugeChart from 'react-gauge-chart';
import "@/styles/pages/dashboard.css";

export default function SensorReadingsPage() {
  const { readings, loading, error, loadReadings } = useSensorReadingsModel();

  useEffect(() => {
    loadReadings(20); 
  }, []);


  const latest = readings?.[0];
    function getTempColor(temp) {
    if (temp < 15) return 'blue';      
  if (temp < 22) return 'green';      
  if (temp < 28) return 'yellow';    
  return 'red';      
  }
  function getHumidityColor(humidity) {
    if (humidity < 30) return 'red';         
  if (humidity < 50) return 'orange';      
  if (humidity < 75) return 'yellow';       
  return 'green';                           
}

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
