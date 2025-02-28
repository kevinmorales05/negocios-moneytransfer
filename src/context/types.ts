import { ReactNode } from "react";

// Definir el tipo de usuario 
export interface User {
  id: string;
  name: string;
  email: string;
}

// Definir la estructura del contexto
export interface AuthContextType {
  user: User | null;
  logged: boolean;
  token: string | null;
  login: (userData: User, sessionToken: string) => void;
  logout: () => void;
}

// Definir las props del AuthProvider
export interface AuthProviderProps {
  children: ReactNode;
}