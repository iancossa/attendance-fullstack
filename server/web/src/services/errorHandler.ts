interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp?: Date;
  requestId?: string;
}

interface UserFriendlyError {
  message: string;
  type: 'error' | 'warning' | 'info';
  action?: string;
}

export class ApiErrorHandler {
  static handle(error: any): UserFriendlyError {
    // Network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        message: 'Connection lost. Please check your internet connection.',
        type: 'warning',
        action: 'retry'
      };
    }

    // Timeout errors
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      return {
        message: 'Request timed out. Please try again.',
        type: 'warning',
        action: 'retry'
      };
    }

    // HTTP status errors
    if (error.message.includes('HTTP')) {
      const status = error.message.match(/HTTP (\d+)/)?.[1];
      
      switch (status) {
        case '401':
          return {
            message: 'Session expired. Please login again.',
            type: 'error',
            action: 'login'
          };
        case '403':
          return {
            message: 'Access denied. You don\'t have permission for this action.',
            type: 'error'
          };
        case '404':
          return {
            message: 'Resource not found. It may have been deleted or moved.',
            type: 'error'
          };
        case '409':
          return {
            message: 'Conflict detected. This action cannot be completed.',
            type: 'warning'
          };
        case '422':
          return {
            message: 'Invalid data provided. Please check your input.',
            type: 'error'
          };
        case '429':
          return {
            message: 'Too many requests. Please wait a moment and try again.',
            type: 'warning',
            action: 'wait'
          };
        case '500':
          return {
            message: 'Server error occurred. Please try again later.',
            type: 'error',
            action: 'retry'
          };
        case '503':
          return {
            message: 'Service temporarily unavailable. Please try again later.',
            type: 'warning',
            action: 'retry'
          };
        default:
          return {
            message: `Server error (${status}). Please try again.`,
            type: 'error',
            action: 'retry'
          };
      }
    }

    // Validation errors
    if (error.code === 'VALIDATION_ERROR' || error.message.includes('validation')) {
      return {
        message: error.details?.message || 'Invalid data provided. Please check your input.',
        type: 'error'
      };
    }

    // Authentication errors
    if (error.code === 'UNAUTHORIZED' || error.message.includes('unauthorized')) {
      return {
        message: 'Authentication failed. Please login again.',
        type: 'error',
        action: 'login'
      };
    }

    // QR-specific errors
    if (error.message.includes('QR') || error.message.includes('session')) {
      if (error.message.includes('expired')) {
        return {
          message: 'QR code has expired. Please generate a new one.',
          type: 'warning',
          action: 'refresh'
        };
      }
      if (error.message.includes('invalid')) {
        return {
          message: 'Invalid QR code format. Please scan a valid attendance QR code.',
          type: 'error'
        };
      }
      if (error.message.includes('already marked')) {
        return {
          message: 'Attendance already marked for this session.',
          type: 'info'
        };
      }
    }

    // Student-specific errors
    if (error.message.includes('student')) {
      if (error.message.includes('not found')) {
        return {
          message: 'Student record not found. Please contact administrator.',
          type: 'error'
        };
      }
      if (error.message.includes('not enrolled')) {
        return {
          message: 'You are not enrolled in this class.',
          type: 'error'
        };
      }
    }

    // Camera/Scanner errors
    if (error.message.includes('camera') || error.message.includes('Camera')) {
      if (error.message.includes('denied') || error.message.includes('NotAllowedError')) {
        return {
          message: 'Camera access denied. Please allow camera access and try again.',
          type: 'warning',
          action: 'permission'
        };
      }
      if (error.message.includes('not found') || error.message.includes('NotFoundError')) {
        return {
          message: 'No camera found on this device.',
          type: 'error'
        };
      }
      return {
        message: 'Camera not available. You can enter QR data manually.',
        type: 'warning',
        action: 'manual'
      };
    }

    // Generic fallback
    return {
      message: error.message || 'Something went wrong. Please try again.',
      type: 'error',
      action: 'retry'
    };
  }

  static logError(error: any, context?: string) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.error('API Error:', errorInfo);

    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error tracking service
      // errorTrackingService.captureException(error, errorInfo);
    }
  }

  static handleNetworkError(): UserFriendlyError {
    return {
      message: 'Network connection lost. Please check your internet connection.',
      type: 'warning',
      action: 'retry'
    };
  }

  static handleOfflineError(): UserFriendlyError {
    return {
      message: 'You are currently offline. Some features may not be available.',
      type: 'info',
      action: 'offline'
    };
  }
}