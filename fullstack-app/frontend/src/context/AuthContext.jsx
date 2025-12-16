import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("token") ? true : false
  );

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
