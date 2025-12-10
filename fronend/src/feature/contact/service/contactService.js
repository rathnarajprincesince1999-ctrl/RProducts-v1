import { API_URL } from '../../../config';

const CONTACT_API_URL = `${API_URL}/contact`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const contactService = {
  async submitContact(userId, data) {
    try {
      const url = userId ? `${CONTACT_API_URL}?userId=${userId}` : CONTACT_API_URL;
      const response = await fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit contact');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }
};
