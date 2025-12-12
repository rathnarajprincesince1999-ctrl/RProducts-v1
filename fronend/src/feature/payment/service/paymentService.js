import { APP_CONFIG } from '../../../config';

const PAYMENT_API_URL = `${APP_CONFIG.API_URL}/api/payments`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const paymentService = {
  async savePayment(userId, data) {
    try {
      const response = await fetch(`${PAYMENT_API_URL}/${userId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save payment');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async getUserPayments(userId) {
    try {
      const response = await fetch(`${PAYMENT_API_URL}/${userId}`, { headers: getAuthHeaders() });
      if (!response.ok) throw new Error('Failed to fetch payments');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async deletePayment(paymentId) {
    try {
      const response = await fetch(`${PAYMENT_API_URL}/${paymentId}`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to delete payment');
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }
};
