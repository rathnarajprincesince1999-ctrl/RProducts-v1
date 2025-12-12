import { APP_CONFIG } from '../../../config';

const PRODUCT_API_URL = `${APP_CONFIG.API_URL}/api/products`;

const getAuthHeaders = () => {
  const token = localStorage.getItem(APP_CONFIG.ADMIN_JWT_STORAGE_KEY) || localStorage.getItem(APP_CONFIG.JWT_STORAGE_KEY);
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const productService = {
  async createProduct(data) {
    try {
      const response = await fetch(PRODUCT_API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
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
      const response = await fetch(PRODUCT_API_URL, { 
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async getProductById(id) {
    try {
      const response = await fetch(`${PRODUCT_API_URL}/${id}`, {
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch product');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async getProductsByCategory(categoryId) {
    try {
      const response = await fetch(`${PRODUCT_API_URL}/category/${categoryId}`, { 
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
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
        mode: 'cors',
        credentials: 'include',
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
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to delete product');
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async searchProducts(searchTerm) {
    try {
      const response = await fetch(`${PRODUCT_API_URL}/search?q=${encodeURIComponent(searchTerm)}`, {
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to search products');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  async filterProducts(filters) {
    try {
      const params = new URLSearchParams();
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.categoryId) params.append('categoryId', filters.categoryId);
      
      const response = await fetch(`${PRODUCT_API_URL}/filter?${params.toString()}`, {
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to filter products');
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }
};
