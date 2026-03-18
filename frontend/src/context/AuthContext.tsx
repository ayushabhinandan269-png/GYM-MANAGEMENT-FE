import { createContext, useContext, useState, useEffect } from "react";

interface AuthUser {
  token: string | null;
  role: string | null;
}

interface AuthContextType {
  user: AuthUser;
  login: (token: string, role: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<AuthUser>({
    token: null,
    role: null
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setUser({ token, role });
    }

    setLoading(false);

  }, []);

  const login = (token: string, role: string) => {

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setUser({ token, role });
  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setUser({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};