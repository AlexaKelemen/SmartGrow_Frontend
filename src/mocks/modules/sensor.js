import { http, HttpResponse } from 'msw';

export const sensorHandlers = [
  http.get('/api/SensorReading/:greenhouseId/current-sensor-readings', ({ params }) => {
    const { greenhouseId } = params;
    const id = parseInt(greenhouseId);

    const readings = {
      1: { airTemperature: 24.2, soilHumidity: 68, brightness: 120 },
      2: { airTemperature: 20.5, soilHumidity: 75, brightness: 140 },
      3: { airTemperature: 26.0, soilHumidity: 60, brightness: 180 }
    };

    const reading = readings[id] ?? {
      airTemperature: 22.0,
      soilHumidity: 70,
      brightness: 150
    };

    return HttpResponse.json({ ...reading, greenhouseId: id });
  })
];
