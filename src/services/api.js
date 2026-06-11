import axios from 'axios';


const API = axios.create({

  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});


export const checkServerHealth = async () => {
  try {
    const response = await API.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error connecting to the backend server:', error);
    throw error;
  }
};

export default API;