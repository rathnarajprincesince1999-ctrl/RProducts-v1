import { API_URL } from '../../../config';

const PRODUCT_API_URL = `${API_URL}/products`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const productService = {
  async createProduct(data) {
    try {
      const response = await fetch(PRODUCT_API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to create product' }));
        throw new Error(error.message || 'Failed to create product');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async getAllProducts() {
    try {
      const response = await fetch(PRODUCT_API_URL, { headers: getAuthHeaders() });
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async getProductsByCategory(categoryId) {
    try {
      const response = await fetch(`${PRODUCT_API_URL}/category/${categoryId}`, { headers: getAuthHeaders() });
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async updateProduct(id, data) {
    try {
      const response = await fetch(`${PRODUCT_API_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to update product' }));
        throw new Error(error.message || 'Failed to update product');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async deleteProduct(id) {
    try {
      const response = await fetch(`${PRODUCT_API_URL}/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to delete product');
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }
};
