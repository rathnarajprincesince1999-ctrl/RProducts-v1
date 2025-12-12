export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Validate API URL
if (!API_URL && import.meta.env.DEV) {
  throw new Error('VITE_API_URL environment variable is not set');
}

// Export other configuration constants
export const APP_CONFIG = {
  API_URL,
  API_TIMEOUT: 30000, // 30 seconds
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  JWT_STORAGE_KEY: 'token',
  ADMIN_JWT_STORAGE_KEY: 'adminToken',
  IS_PRODUCTION: import.meta.env.PROD
};