import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [logged, setLogged] = useState(!!user); // Inicializa como true si hay un usuario
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null; // Recupera el token del localStorage
  });

  const login = (userData, sessionToken) => {
    setUser(userData);
    setLogged(true); // Marca como loggeado
    setToken(sessionToken); // Guarda el token de sesión
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", sessionToken); // Guarda el token en localStorage
  };

  const logout = () => {
    setUser(null);
    setLogged(false); // Marca como no loggeado
    setToken(null); // Limpia el token
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Elimina el token de localStorage
  };

  return (
    <AuthContext.Provider value={{ user, logged, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
