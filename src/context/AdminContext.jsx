import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage on startup
    const token = localStorage.getItem('vk_admin_token');
    if (token) {
      // For full security, in production we would verify token with backend
      // Here we trust the token and mark authenticated.
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Attempt serverless login call
      const response = await axios.post('/api/admin-login', { username, password });
      if (response.data && response.data.token) {
        localStorage.setItem('vk_admin_token', response.data.token);
        setIsAdmin(true);
        return { success: true };
      }
    } catch (error) {
      console.warn("API Admin Login failed or endpoint not found. Trying local authentication fallback.", error);
      
      // Local development fallback
      const DEFAULT_USER = "servicesmaster12";
      const DEFAULT_PASS = "Vksaloon@415263";
      
      if (username === DEFAULT_USER && password === DEFAULT_PASS) {
        const mockToken = "vk_salon_mock_jwt_token_" + Date.now();
        localStorage.setItem('vk_admin_token', mockToken);
        setIsAdmin(true);
        return { success: true };
      }
      
      return { 
        success: false, 
        message: error.response?.data?.message || "Invalid credentials. Please check username and password." 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('vk_admin_token');
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
