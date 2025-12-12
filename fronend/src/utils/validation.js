export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address');
  }
  return true;
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  return true;
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    throw new Error(`${fieldName} is required`);
  }
  return true;
};

export const isValidImageFile = (file) => {
  return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(file.type);
};

export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  return error?.message || error?.error || 'An error occurred';
};