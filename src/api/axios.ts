import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  
});
console.log("API URL =", import.meta.env.VITE_API_URL);


// ✅ ajoute automatiquement le token sur chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ si token invalide → logout auto
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      // option: rediriger (sans dépendre de react-router ici)
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
