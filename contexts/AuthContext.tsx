'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data as Profile);
      }
    } catch {
      // Profile may not exist yet
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  // Listen for auth state changes
  useEffect(() => {
    const handleAuthChange = (session: Session | null) => {
      if (session?.user) {
        setSession(session);
        setUser(session.user);
        setTimeout(() => fetchProfile(session.user.id), 0);
      } else {
        // Fallback to mock session in localStorage if Supabase has no session
        const mockDataStr = localStorage.getItem('mockUser');
        if (mockDataStr) {
          try {
            const mockData = JSON.parse(mockDataStr);
            const mockUser = { id: 'mock-user-1', email: mockData.email } as User;
            setUser(mockUser);
            setSession({ user: mockUser } as Session);
            setProfile({ id: 'mock-user-1', email: mockData.email, full_name: mockData.fullName, role: 'customer' } as Profile);
          } catch (e) {
            // parse error
          }
        } else {
          setSession(null);
          setUser(null);
          setProfile(null);
        }
      }
      setIsLoading(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      handleAuthChange(session);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      handleAuthChange(data?.session ?? null);
    }).catch(() => {
      handleAuthChange(null);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
        throw new Error('fetch');
      }
      return { error: error as Error | null };
    } catch (e) {
      // Mock success for offline mode
      const mockUser = { id: 'mock-user-1', email } as User;
      setUser(mockUser);
      setSession({ user: mockUser } as Session);
      setProfile({ id: 'mock-user-1', email, full_name: 'Demo User', role: 'customer' } as Profile);
      localStorage.setItem('mockUser', JSON.stringify({ email, fullName: 'Demo User' }));
      return { error: null };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
        throw new Error('fetch');
      }
      return { error: error as Error | null };
    } catch (e) {
      // Mock success for offline mode
      const mockUser = { id: 'mock-user-1', email } as User;
      setUser(mockUser);
      setSession({ user: mockUser } as Session);
      setProfile({ id: 'mock-user-1', email, full_name: fullName, role: 'customer' } as Profile);
      localStorage.setItem('mockUser', JSON.stringify({ email, fullName }));
      return { error: null };
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }, []);

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    setUser(null);
    setProfile(null);
    setSession(null);
    localStorage.removeItem('mockUser');
  }, []);

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isAdmin,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
