import { APP_CONFIG } from '../../../config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const profileService = {
  async getUserProfile(userId) {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/api/profile/${userId}`, {
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to fetch profile' }));
        throw new Error(error.message || 'Failed to fetch profile');
      }
      return response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      throw new Error(error.message || 'Network error');
    }
  },

  async updateUserProfile(userId, data) {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/api/profile/${userId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to update profile' }));
        throw new Error(error.message || 'Failed to update profile');
      }
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
      const response = await fetch(`${APP_CONFIG.API_URL}/api/admin/profile/${adminId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to update admin profile' }));
        throw new Error(error.message || `Failed to update admin profile (${response.status})`);
      }
      return response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      throw new Error(error.message || 'Network error');
    }
  },

  async getAddresses(userId) {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/api/profile/${userId}/addresses`, {
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch addresses');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async saveAddress(userId, data) {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/api/profile/${userId}/addresses`, {
        method: 'POST',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to save address' }));
        throw new Error(error.message || `Failed to save address (${response.status})`);
      }
      return response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      throw new Error(error.message || 'Network error');
    }
  },

  async updateAddress(addressId, data) {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/api/profile/addresses/${addressId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to update address' }));
        throw new Error(error.message || `Failed to update address (${response.status})`);
      }
      return response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      throw new Error(error.message || 'Network error');
    }
  },

  async deleteAddress(addressId) {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/api/profile/addresses/${addressId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to delete address');
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async getPayments(userId) {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/api/profile/${userId}/payments`, {
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch payments');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async savePayment(userId, data) {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/api/profile/${userId}/payments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to save payment' }));
        throw new Error(error.message || `Failed to save payment (${response.status})`);
      }
      return response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      throw new Error(error.message || 'Network error');
    }
  },

  async updatePayment(paymentId, data) {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/api/profile/payments/${paymentId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to update payment' }));
        throw new Error(error.message || `Failed to update payment (${response.status})`);
      }
      return response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      throw new Error(error.message || 'Network error');
    }
  },

  async deletePayment(paymentId) {
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/api/profile/payments/${paymentId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to delete payment');
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }
};
