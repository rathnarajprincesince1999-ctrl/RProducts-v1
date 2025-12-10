import { API_URL } from '../../../config';

const AUTH_API_URL = `${API_URL}/auth`;
const ADMIN_API_URL = `${API_URL}/admin`;

export const authService = {
  async signup(data) {
    try {
      const response = await fetch(`${AUTH_API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error. Please try again.');
    }
  },

  async login(data) {
    try {
      const response = await fetch(`${AUTH_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error. Please try again.');
    }
  }
};

export const adminService = {
  async login(data) {
    try {
      const response = await fetch(`${ADMIN_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Admin login failed');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error. Please try again.');
    }
  }
};
