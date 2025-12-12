export const showNotification = (message, type = 'success') => {
  // Remove existing notifications to prevent stacking
  const existingNotifications = document.querySelectorAll('.notification-toast');
  existingNotifications.forEach(notification => notification.remove());

  const notification = document.createElement('div');
  notification.className = `notification-toast fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 ${
    type === 'error' ? 'bg-red-500 text-white' :
    type === 'warning' ? 'bg-yellow-500 text-black' :
    'bg-green-500 text-white'
  }`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  const timeoutId = setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
  
  // Allow manual close on click
  notification.addEventListener('click', () => {
    clearTimeout(timeoutId);
    if (notification.parentNode) {
      notification.remove();
    }
  });
};