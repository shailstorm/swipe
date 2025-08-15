import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { router } from "expo-router";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void
  session: Session | null;
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: true
});

// Access the context as a hook
export function useAuthSession() {
  return useContext(AuthContext);
}

export default function AuthProvider  ({children}:{children: ReactNode}): ReactNode {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(() => {
    router.replace('/(tabs)/Feed');
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace('/Auth');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};