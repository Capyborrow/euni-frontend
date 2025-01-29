import { createContext, useState, ReactNode, FC } from "react";

export interface AuthData {
  accessToken: string;
  email: string;
}

export interface AuthContextType {
  auth: AuthData | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthData | null>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
  handlePersistChange: (
    event: React.FormEvent<HTMLInputElement>,
    checked?: boolean
  ) => void;
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

  const handlePersistChange = (
    _: React.FormEvent<HTMLInputElement>,
    checked?: boolean
  ) => {
    setPersist(!!checked);
  };
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, persist, setPersist, handlePersistChange }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
