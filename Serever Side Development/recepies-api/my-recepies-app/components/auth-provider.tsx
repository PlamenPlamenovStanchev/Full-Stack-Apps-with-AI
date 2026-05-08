"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearStoredToken,
  getMe,
  getStoredToken,
  login,
  logout,
  register,
  storeToken,
  type User,
} from "@/lib/client-api";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, password: string, name: string) => Promise<void>;
  logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      const storedToken = getStoredToken();

      if (!storedToken || !active) {
        return;
      }

      setLoading(true);
      setToken(storedToken);
      getMe(storedToken)
        .then(({ user: currentUser }) => {
          if (active) {
            setUser(currentUser);
          }
        })
        .catch(() => {
          clearStoredToken();

          if (active) {
            setToken(null);
          }
        })
        .finally(() => {
          if (active) {
            setLoading(false);
          }
        });
    });

    return () => {
      active = false;
    };
  }, []);

  const loginUser = useCallback(async (email: string, password: string) => {
    const response = await login(email, password);
    storeToken(response.token);
    setToken(response.token);
    setUser(response.user);
  }, []);

  const registerUser = useCallback(
    async (email: string, password: string, name: string) => {
      const response = await register(email, password, name);
      storeToken(response.token);
      setToken(response.token);
      setUser(response.user);
    },
    [],
  );

  const logoutUser = useCallback(async () => {
    await logout();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, loginUser, registerUser, logoutUser }),
    [user, token, loading, loginUser, registerUser, logoutUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
