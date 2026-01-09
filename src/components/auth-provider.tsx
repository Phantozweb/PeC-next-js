'use client';

import type { User } from '@/lib/types';
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_EMAILS = ['preethikaeyecare@gmail.com', 'eyecarepreethika@gmail.com'];
const MOCK_SALES_PEOPLE = ['sales1@example.com', 'sales2@example.com'];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => void;
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
    (email: string) => {
      let loggedInUser: User | null = null;
      const normalizedEmail = email.toLowerCase();
      
      if (ADMIN_EMAILS.includes(normalizedEmail)) {
        loggedInUser = { email: normalizedEmail, role: 'admin' };
      } else if (MOCK_SALES_PEOPLE.includes(normalizedEmail)) {
        loggedInUser = { email: normalizedEmail, role: 'user' };
      } else {
        // For demonstration, any other email logs in as a user
        loggedInUser = { email: normalizedEmail, role: 'user' };
      }

      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        router.push('/dashboard');
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
