import React, { useEffect } from 'react';
import { useSensorReadingsModel } from '@/pages/viewmodels/SensorReadingsModel';

export default function SensorReadingsPage() {
    const { readings, loading, error, loadReadings } = useSensorReadingsModel();

    useEffect(() => {
        loadReadings(20); 
    }, []);

    return (
        <div className="page-container">
            <h1>Sensor Readings</h1>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && readings && (
                <table className="readings-table">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Air Temp (°C)</th>
                            <th>Air Humidity (%)</th>
                            <th>Soil Humidity (%)</th>
                            <th>Light Level (lux)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {readings.map((reading) => (
                            <tr key={reading.id}>
                                <td>{new Date(reading.timestamp).toLocaleString()}</td>
                                <td>{reading.airTemperature}</td>
                                <td>{reading.airHumidity}</td>
                                <td>{reading.soilHumidity}</td>
                                <td>{reading.lightLevel}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
