import { createContext, useState, ReactNode, FC } from "react";

export interface AuthData {
  accessToken: string;
  email: string;
}

export interface AuthContextType {
  auth: AuthData | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthData | null>>;
  persist: boolean;
  togglePersist: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [persist, setPersist] = useState<boolean>(() => {
    return localStorage.getItem("persist") === "true";
  });

  const togglePersist = () => {
    const newPersist = !persist;
    setPersist(newPersist);
    localStorage.setItem("persist", newPersist ? "true" : "false");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, togglePersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
