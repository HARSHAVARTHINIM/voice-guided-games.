// src/utils/auth.js

export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };
  
  export const getUserEmail = () => {
    return localStorage.getItem('userEmail');
  };
  