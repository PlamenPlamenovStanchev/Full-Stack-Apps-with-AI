import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  masterPasswordSet: boolean;
  setMasterPasswordSet: (val: boolean) => void;
  hasVaultAssigned: boolean | null;
  checkVaultAssignment: (userId: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  masterPasswordSet: false,
  setMasterPasswordSet: () => {},
  hasVaultAssigned: null,
  checkVaultAssignment: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [masterPasswordSet, setMasterPasswordSet] = useState(false);
  const [hasVaultAssigned, setHasVaultAssigned] = useState<boolean | null>(null);

  const checkVaultAssignment = async (userId: string) => {
    const { data } = await supabase.from('user_settings').select('encrypted_validation').eq('user_id', userId).single();
    setHasVaultAssigned(!!data);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user.id) checkVaultAssignment(session.user.id);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setMasterPasswordSet(false);
        setHasVaultAssigned(null);
      } else {
        checkVaultAssignment(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading, masterPasswordSet, setMasterPasswordSet, hasVaultAssigned, checkVaultAssignment }}>
      {children}
    </AuthContext.Provider>
  );
};
