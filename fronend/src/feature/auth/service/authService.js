import { APP_CONFIG } from '../../../config';

const AUTH_API_URL = `${APP_CONFIG.API_URL}/api/auth`;
const ADMIN_API_URL = `${APP_CONFIG.API_URL}/api/admin`;

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.API_TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please check your connection');
    }
    throw error;
  }
};

const handleApiError = async (response) => {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // If JSON parsing fails, use the default error message
    }
    throw new Error(errorMessage);
  }
  return response;
};

export const authService = {
  async signup(data) {
    try {
      const response = await fetchWithTimeout(`${AUTH_API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      await handleApiError(response);
      const result = await response.json();
      
      // Store token if provided
      if (result.token) {
        localStorage.setItem(APP_CONFIG.JWT_STORAGE_KEY, result.token);
      }
      
      return result;
    } catch (error) {
      throw new Error(error.message || 'Signup failed. Please try again.');
    }
  },

  async login(data) {
    try {
      const response = await fetchWithTimeout(`${AUTH_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      await handleApiError(response);
      const result = await response.json();
      
      // Store token if provided
      if (result.token) {
        localStorage.setItem(APP_CONFIG.JWT_STORAGE_KEY, result.token);
      }
      
      return result;
    } catch (error) {
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  },

  logout() {
    localStorage.removeItem(APP_CONFIG.JWT_STORAGE_KEY);
    localStorage.removeItem(APP_CONFIG.ADMIN_JWT_STORAGE_KEY);
  }
};

export const adminService = {
  async login(data) {
    try {
      const response = await fetchWithTimeout(`${ADMIN_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      await handleApiError(response);
      const result = await response.json();
      
      // Store admin token if provided
      if (result.token) {
        localStorage.setItem(APP_CONFIG.ADMIN_JWT_STORAGE_KEY, result.token);
      }
      
      return result;
    } catch (error) {
      throw new Error(error.message || 'Admin login failed. Please try again.');
    }
  },

  logout() {
    localStorage.removeItem(APP_CONFIG.ADMIN_JWT_STORAGE_KEY);
  }
};
