import axios from 'axios';

// Create an Axios instance
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_CON}`, // Adjust the base URL to match your backend
});

// Interceptor to attach the token to every request
instance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Attach the token in the Authorization header as Bearer
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
