import { http, HttpResponse } from 'msw';

let mockGreenhouses = [
  {
    id: 1,
    name: "Cool greenhouse",
    lighting: "40%",
    temperature: "24°C",
    humidity: "60%",
    macAddress: '00:11:22:33:44:55',
    imageUrl: "/images/greenhouse.png"
  }
];

let nextId = 2;
export const greenhouseHandlers = [
    // GET list
    http.get('/api/Greenhouse', () => {
      return HttpResponse.json(mockGreenhouses);
    }),
  
    // POST /pair
    http.post('/api/Greenhouse/pair', async ({ request }) => {
      const { name, macAddress } = await request.json();
  
      if (mockGreenhouses.find(g => g.name === name)) {
        return HttpResponse.json({ error: "Name already taken" }, { status: 409 });
      }
  
      const newGH = {
        id: nextId++,
        name,
        macAddress,
        lighting: "0%",
        temperature: "0°C",
        humidity: "0%",
        imageUrl: "/images/greenhouse.png",
      };
  
      mockGreenhouses.push(newGH);
      return HttpResponse.json(newGH, { status: 201 });
    }),
  
    // PUT /rename/:id
    http.put('/api/Greenhouse/rename/:id', async ({ params, request }) => {
      const id = Number(params.id);
      const { name } = await request.json();
  
      if (mockGreenhouses.some(g => g.name === name)) {
        return HttpResponse.json({ error: "Name already taken" }, { status: 409 });
      }
  
      const gh = mockGreenhouses.find(g => g.id === id);
      if (!gh) return HttpResponse.json({ error: "Greenhouse not found" }, { status: 404 });
  
      gh.name = name;
      return HttpResponse.json(gh);
    }),
  ];