import { http, HttpResponse } from 'msw';

let mockUsers = [
  {
    id: 1,
    username: 'testuser',
    password: 'password123', // plaintext for mock only
    token: 'mock-jwt-token-1'
  }
];

export const authHandlers = [
  // POST /api/auth/register
  http.post('/api/auth/register', async ({ request }) => {
    const { username, password } = await request.json();

    const existing = mockUsers.find(u => u.username === username);
    if (existing) {
      return HttpResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    const newUser = {
      id: Date.now(),
      username,
      password,
      token: 'mock-jwt-token-' + Date.now()
    };

    mockUsers.push(newUser);
    return HttpResponse.json({ token: newUser.token }, { status: 201 });
  }),

  // POST /api/auth/login
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = await request.json();

    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (!user) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return HttpResponse.json({ token: user.token });
  })
];
