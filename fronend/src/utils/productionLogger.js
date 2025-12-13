import { APP_CONFIG } from '../config';

export const logError = (error, context = '') => {
  if (!APP_CONFIG.IS_PRODUCTION) return;
  
  // In production, send errors to monitoring service
  // Example: Sentry, LogRocket, etc.
  const errorData = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  // Send to error reporting service
  // errorReportingService.captureException(errorData);
};

export const logEvent = (eventName, data = {}) => {
  if (!APP_CONFIG.IS_PRODUCTION) return;
  
  // In production, send events to analytics service
  // Example: Google Analytics, Mixpanel, etc.
  // analyticsService.track(eventName, data);
};