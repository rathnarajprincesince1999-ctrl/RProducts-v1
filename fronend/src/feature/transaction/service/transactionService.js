import { API_URL } from '../../../config';

const TRANSACTION_API_URL = `${API_URL}/transactions`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const transactionService = {
  async getUserTransactions(userId) {
    try {
      const response = await fetch(`${TRANSACTION_API_URL}/${userId}`, { headers: getAuthHeaders() });
      if (!response.ok) throw new Error('Failed to fetch transactions');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }
};
