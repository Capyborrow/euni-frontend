import { createContext, useState, ReactNode, FC } from "react";

export interface AuthData {
  accessToken: string;
  user: string;
}

export interface AuthContextType {
  auth: AuthData | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthData | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
