// Input sanitization utilities

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const sanitizeHtml = (html) => {
  if (typeof html !== 'string') return html;
  
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

export const validateFileType = (file, allowedTypes) => {
  if (!file || !allowedTypes.includes(file.type)) {
    throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
  }
  return true;
};

export const validateFileSize = (file, maxSizeInMB) => {
  if (!file) return true;
  
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    throw new Error(`File size must be less than ${maxSizeInMB}MB`);
  }
  return true;
};

export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};