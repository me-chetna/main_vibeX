
"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type User = { 
  name: string; 
  email: string;
  avatarUrl?: string;
  bio?: string;
  skills?: string[];
};

type AuthContextType = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('teamup_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('teamup_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string) => {
    const name = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    const newUser: User = { 
      name, 
      email,
      avatarUrl: `https://placehold.co/128x128.png`,
      bio: 'Aspiring innovator and tech enthusiast, passionate about building the future, one line of code at a time. Ready to collaborate and create something amazing!',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'GenAI']
    };
    setUser(newUser);
    localStorage.setItem('teamup_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('teamup_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
