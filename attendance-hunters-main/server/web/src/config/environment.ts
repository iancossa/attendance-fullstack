interface Environment {
  API_BASE_URL: string;
  WS_URL: string;
  QR_EXPIRY_TIME: number;
  POLLING_INTERVAL: number;
  CACHE_TTL: number;
  ENABLE_MOCK: boolean;
  REQUEST_TIMEOUT: number;
  RETRY_ATTEMPTS: number;
}

export const environment: Environment = {
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  WS_URL: process.env.REACT_APP_WS_URL || 'ws://localhost:5000',
  QR_EXPIRY_TIME: 300000, // 5 minutes
  POLLING_INTERVAL: 2000, // 2 seconds
  CACHE_TTL: 300000, // 5 minutes
  REQUEST_TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  ENABLE_MOCK: process.env.NODE_ENV === 'development',
};

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';