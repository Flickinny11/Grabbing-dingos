'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  credits?: number;
  tier?: string;
}

interface DemoSession {
  user?: User;
}

interface DemoAuthContextType {
  data: DemoSession | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  signIn: () => void;
  signOut: () => void;
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    // Check if user was previously signed in (demo mode)
    const savedUser = localStorage.getItem('demo-user');
    if (savedUser) {
      setSession({ user: JSON.parse(savedUser) });
      setStatus('authenticated');
    } else {
      setStatus('unauthenticated');
    }
  }, []);

  const signIn = () => {
    const demoUser: User = {
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@hi-api.com',
      image: '',
      credits: 1250,
      tier: 'pro',
    };
    
    setSession({ user: demoUser });
    setStatus('authenticated');
    localStorage.setItem('demo-user', JSON.stringify(demoUser));
  };

  const signOut = () => {
    setSession(null);
    setStatus('unauthenticated');
    localStorage.removeItem('demo-user');
  };

  return (
    <DemoAuthContext.Provider value={{ data: session, status, signIn, signOut }}>
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoSession() {
  const context = useContext(DemoAuthContext);
  if (context === undefined) {
    throw new Error('useDemoSession must be used within a DemoAuthProvider');
  }
  return context;
}