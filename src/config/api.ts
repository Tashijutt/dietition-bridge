// Determine API URL based on environment
const isDevelopment = import.meta.env.DEV;
export const API_URL = isDevelopment 
  ? 'http://localhost:5000'
  : import.meta.env.VITE_API_URL || 'https://dietition-bridge-be.vercel.app';