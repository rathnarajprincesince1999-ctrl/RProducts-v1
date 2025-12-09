const API_URL = 'http://rathnaproducts.store/api/auth';

export const authService = {
  async signup(data) {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Signup failed');
    return response.json();
  },

  async login(data) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  }
};
