import React, { createContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sm_user')); } catch(e){ return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('sm_token'));

  useEffect(()=>{
    if(user) localStorage.setItem('sm_user', JSON.stringify(user)); else localStorage.removeItem('sm_user');
    if(token) localStorage.setItem('sm_token', token); else localStorage.removeItem('sm_token');
  }, [user, token]);

  return <AuthContext.Provider value={{user, setUser, token, setToken}}>{children}</AuthContext.Provider>
}

export default AuthContext;
