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

export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  if (!/^\d{13,19}$/.test(cleaned)) {
    throw new Error('Card number must be 13-19 digits');
  }
  return true;
};

export const validateCVV = (cvv) => {
  if (!/^\d{3,4}$/.test(cvv)) {
    throw new Error('CVV must be 3-4 digits');
  }
  return true;
};

export const validateExpiryDate = (expiryDate) => {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
    throw new Error('Expiry date must be in MM/YY format');
  }
  
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expYear = parseInt(year);
  const expMonth = parseInt(month);
  
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    throw new Error('Card has expired');
  }
  
  return true;
};

export const validateUpiId = (upiId) => {
  if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(upiId)) {
    throw new Error('Please enter a valid UPI ID (e.g., user@paytm)');
  }
  return true;
};

export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  return error?.message || error?.error || 'An error occurred';
};