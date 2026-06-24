import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no Supabase client, just set loading false immediately
    if (!supabase) {
      setLoading(false);
      return;
    }

    const timeout = setTimeout(() => setLoading(false), 5000);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      clearTimeout(timeout);
    }).catch(() => {
      setLoading(false);
      clearTimeout(timeout);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => { subscription.unsubscribe(); clearTimeout(timeout); };
  }, []);

  const signUp = (email, password) => {
    if (!supabase) return Promise.reject(new Error('Supabase is not configured'));
    return supabase.auth.signUp({ email, password });
  };
  const signIn = (email, password) => {
    if (!supabase) return Promise.reject(new Error('Supabase is not configured'));
    return supabase.auth.signInWithPassword({ email, password });
  };
  const signOut = () => {
    if (!supabase) return Promise.resolve();
    return supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
