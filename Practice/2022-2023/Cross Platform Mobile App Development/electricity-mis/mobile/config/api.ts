// API Configuration
// Update this URL based on your environment
export const API_BASE_URL = __DEV__ 
  ? 'http://10.12.75.53:3000/api/tokens'  // Android emulator
  : 'http://localhost:3000/api/tokens'; // iOS simulator or production

// For physical device testing, use your computer's IP address:
// export const API_BASE_URL = 'http://192.168.1.XXX:3000/api/tokens';
