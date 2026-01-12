'use client';

import type { User } from '@/lib/types';
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';

const CREDENTIALS = {
  'preethikaeyecare@gmail.com': { password: 'admin@peclensboxmdu', role: 'admin' },
  'eyecarepreethika@gmail.com': { password: 'staff@peclensboxmdu', role: 'user' },
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password?: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    (email: string, password?: string) => {
      const normalizedEmail = email.toLowerCase();
      const userCredentials = CREDENTIALS[normalizedEmail];

      if (userCredentials && userCredentials.password === password) {
        const loggedInUser: User = { email: normalizedEmail, role: userCredentials.role };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        router.push('/dashboard');
      } else {
        // Handle incorrect credentials
        console.error('Invalid email or password');
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  }, [router]);

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
