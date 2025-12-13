import { APP_CONFIG } from '../../../config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.id;
};

export const cartService = {
  async getCartItems() {
    try {
      const userId = getUserId();
      if (!userId) return [];
      
      const response = await fetch(`${APP_CONFIG.API_URL}/api/cart/${userId}`, {
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) return [];
      return response.json();
    } catch (error) {
      return [];
    }
  },

  async addToCart(product, quantity = 1) {
    try {
      const userId = getUserId();
      if (!userId) throw new Error('User not logged in');
      
      const response = await fetch(`${APP_CONFIG.API_URL}/api/cart/${userId}/add?productId=${product.id}&quantity=${quantity}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to add item to cart');
      return response.json();
    } catch (error) {
      throw new Error('Failed to add item to cart');
    }
  },

  async updateQuantity(itemId, quantity) {
    try {
      const userId = getUserId();
      if (!userId) throw new Error('User not logged in');
      
      // Get cart items to find the product ID from item ID
      const cartItems = await this.getCartItems();
      const item = cartItems.find(item => item.id === itemId);
      if (!item) throw new Error('Cart item not found');
      
      const response = await fetch(`${APP_CONFIG.API_URL}/api/cart/${userId}/update?productId=${item.productId}&quantity=${quantity}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to update cart');
      return this.getCartItems();
    } catch (error) {
      throw new Error('Failed to update cart');
    }
  },

  async removeFromCart(itemId) {
    try {
      const userId = getUserId();
      if (!userId) throw new Error('User not logged in');
      
      // Get cart items to find the product ID from item ID
      const cartItems = await this.getCartItems();
      const item = cartItems.find(item => item.id === itemId);
      if (!item) throw new Error('Cart item not found');
      
      const response = await fetch(`${APP_CONFIG.API_URL}/api/cart/${userId}/remove?productId=${item.productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to remove item from cart');
      return this.getCartItems();
    } catch (error) {
      throw new Error('Failed to remove item from cart');
    }
  },

  async clearCart() {
    try {
      const userId = getUserId();
      if (!userId) throw new Error('User not logged in');
      
      const response = await fetch(`${APP_CONFIG.API_URL}/api/cart/${userId}/clear`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        mode: 'cors',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      return [];
    } catch (error) {
      throw new Error('Failed to clear cart');
    }
  },

  async getCartTotal() {
    try {
      const cart = await this.getCartItems();
      return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    } catch (error) {
      return 0;
    }
  },

  async getCartItemCount() {
    try {
      const cart = await this.getCartItems();
      return cart.reduce((count, item) => count + item.quantity, 0);
    } catch (error) {
      return 0;
    }
  }
};