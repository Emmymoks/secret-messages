import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("sm_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("sm_token") || null);

  // Helper to read a non-HttpOnly cookie (HttpOnly can't be read from JS).
  // This will return the token if the server sets a non-HttpOnly cookie for compatibility.
  function readCookie(name) {
    try {
      const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/\\+^])/g, '\\$1') + '=([^;]*)'
      ));
      return matches ? decodeURIComponent(matches[1]) : null;
    } catch (e) {
      return null;
    }
  }

  // If there's no token in localStorage but a cookie is present (non-HttpOnly), use it.
  useEffect(() => {
    if (!token) {
      const cookieToken = readCookie('token');
      if (cookieToken) setToken(cookieToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("sm_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("sm_user");
    }

    if (token) {
      localStorage.setItem("sm_token", token);
    } else {
      localStorage.removeItem("sm_token");
    }
  }, [user, token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("sm_user");
    localStorage.removeItem("sm_token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 🔥 Custom hook for easier usage
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
