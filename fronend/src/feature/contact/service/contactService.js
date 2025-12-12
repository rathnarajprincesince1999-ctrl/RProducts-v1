import { APP_CONFIG } from '../../../config';

const CONTACT_API_URL = `${APP_CONFIG.API_URL}/api/contact`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const contactService = {
  async submitContact(data, userId = null) {
    try {
      const url = userId ? `${CONTACT_API_URL}?userId=${userId}` : CONTACT_API_URL;
      const response = await fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to submit contact' }));
        throw new Error(error.message || 'Failed to submit contact');
      }
      return response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      throw new Error(error.message || 'Network error');
    }
  }
};
