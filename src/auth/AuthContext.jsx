import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [csrf, setCsrf] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => { 
    (async () => {
      try {
        const me = await apiGet('/auth/me');
        setUser(me.user);
      } catch {}
      try {
        const { token } = await apiGet('/auth/csrf');
        setCsrf(token);
      } catch {}
      setLoading(false);
    })();
  }, []);

  const register = (payload) => apiPost('/auth/register', payload).then((data) => {
    setUser(data.user); return data;
  });
  const login = (payload) => apiPost('/auth/login', payload).then((data) => {
    setUser(data.user); return data;
  });
 const logout = async () => {
  try {
    await apiPost('/auth/logout', {}, { headers: { 'X-CSRF-Token': csrf }});
    setUser(null);
    navigate("/login"); 
  } catch (err) {
    console.error("Logout failed", err);
  }
};

  const value = { user, loading, register, login, logout, csrf };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
