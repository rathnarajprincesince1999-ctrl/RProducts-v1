import { API_URL } from '../../../config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const profileService = {
  async updateUserProfile(userId, data) {
    try {
      const response = await fetch(`${API_URL}/profile/${userId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      throw new Error(error.message || 'Network error');
    }
  },

  async updateAdminProfile(adminId, data) {
    try {
      const response = await fetch(`${API_URL}/admin/profile/${adminId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update admin profile');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }
};
