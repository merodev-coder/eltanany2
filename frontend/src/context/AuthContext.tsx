import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'AhmedEltanany';
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'ELTANANY2';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('eltanany_admin') === 'true';
    } catch {
      return false;
    }
  });

  const login = useCallback((username: string, password: string): boolean => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsAdmin(true);
      try {
        localStorage.setItem('eltanany_admin', 'true');
      } catch {
        // silently fail
      }
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('eltanany_admin');
    } catch {
      // silently fail
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
