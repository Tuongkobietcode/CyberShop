import axios from "axios";

const ACCESS_TOKEN_KEY = "admin_access_token";

export function getAdminAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAdminAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAdminAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = getAdminAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
