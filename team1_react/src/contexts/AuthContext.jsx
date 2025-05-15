import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const getStoredUser = () => {
    const saved = localStorage.getItem("user") || sessionStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  };

  const getStoredToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token") || "";
  };

  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true); // ✅ 추가

  useEffect(() => {
    const userFromStorage = getStoredUser();
    const tokenFromStorage = getStoredToken();

    if (userFromStorage && tokenFromStorage) {
      setUser(userFromStorage);
      setToken(tokenFromStorage);
    }

    setLoading(false); // ✅ 로딩 완료 표시
  }, []);

  const login = (user, token, rememberMe = false) => {
    setUser(user);
    setToken(token);

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(user));
    storage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
