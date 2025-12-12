import { APP_CONFIG } from '../../../config';

const CATEGORY_API_URL = `${APP_CONFIG.API_URL}/api/categories`;

const getAuthHeaders = () => {
  const adminToken = localStorage.getItem(APP_CONFIG.ADMIN_JWT_STORAGE_KEY);
  const userToken = localStorage.getItem(APP_CONFIG.JWT_STORAGE_KEY);
  const token = adminToken || userToken;
  
  if (!token) {
    throw new Error('Authentication required. Please login as admin.');
  }
  
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

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

export const categoryService = {
  async createCategory(data) {
    try {
      const response = await fetchWithTimeout(CATEGORY_API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      await handleApiError(response);
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to create category');
    }
  },

  async getAllCategories() {
    try {
      const response = await fetchWithTimeout(CATEGORY_API_URL, { 
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      await handleApiError(response);
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch categories');
    }
  },

  async getCategoryById(id) {
    if (!id) {
      throw new Error('Category ID is required');
    }
    try {
      const response = await fetchWithTimeout(`${CATEGORY_API_URL}/${id}`, {
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      await handleApiError(response);
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch category');
    }
  },

  async updateCategory(id, data) {
    if (!id) {
      throw new Error('Category ID is required');
    }
    try {
      const response = await fetchWithTimeout(`${CATEGORY_API_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
      });
      await handleApiError(response);
      return response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to update category');
    }
  },

  async deleteCategory(id) {
    if (!id) {
      throw new Error('Category ID is required');
    }
    try {
      const response = await fetchWithTimeout(`${CATEGORY_API_URL}/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      await handleApiError(response);
      // Validate successful deletion
      if (response.ok) {
        return true;
      }
      throw new Error('Delete operation failed');
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      throw new Error(error.message || 'Failed to delete category');
    }
  }
};
