import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/SensorReading/:greenhouseId/current-sensor-readings', ({ params }) => {
    const { greenhouseId } = params;

    return HttpResponse.json({
      airTemperature: 24.2,
      soilHumidity: 68,
      brightness: 120,
      greenhouseId: parseInt(greenhouseId)
    });
  })
];
