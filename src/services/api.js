import axios from 'axios';

// יצירת קליינט קבוע עם כתובת השרת
const API = axios.create({
  // אם נשחרר את האפליקציה לענן נשתמש במשתנה סביבה, מקומית זה יפנה לפורט 5000 שפתחנו
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// פונקציית בדיקה שמושכת את הנתונים מה-health-check שהרצנו הרגע
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