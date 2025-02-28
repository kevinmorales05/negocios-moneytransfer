import { createContext, useState } from "react";
import { AuthContextType, AuthProviderProps, User } from "./types";

// Crear el contexto con un valor inicial tipado
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });

  const [logged, setLogged] = useState<boolean>(!!user);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token") || null;
  });

  const login = (userData: User, sessionToken: string) => {
    setUser(userData);
    setLogged(true);
    setToken(sessionToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", sessionToken);
  };

  const logout = () => {
    setUser(null);
    setLogged(false);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, logged, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
