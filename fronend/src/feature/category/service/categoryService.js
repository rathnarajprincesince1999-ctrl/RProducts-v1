import { API_URL } from '../../../config';

const CATEGORY_API_URL = `${API_URL}/categories`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const categoryService = {
  async createCategory(data) {
    try {
      const response = await fetch(CATEGORY_API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to create category' }));
        throw new Error(error.message || 'Failed to create category');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async getAllCategories() {
    try {
      const response = await fetch(CATEGORY_API_URL, { 
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async updateCategory(id, data) {
    try {
      const response = await fetch(`${CATEGORY_API_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to update category' }));
        throw new Error(error.message || 'Failed to update category');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async deleteCategory(id) {
    try {
      const response = await fetch(`${CATEGORY_API_URL}/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to delete category');
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }
};
