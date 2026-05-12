"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getDemoUser, clearDemoUser, setDemoUser } from "@/lib/firebase";

interface AppUser {
  uid: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  user: AppUser | null;
  role: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user on mount
    const stored = getDemoUser();
    if (stored) {
      setUser(stored.user);
      setRole(stored.role);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { loginWithEmail } = await import("@/lib/firebase");
    const result = await loginWithEmail(email, password);
    const appUser: AppUser = {
      uid: result.user.uid,
      email: result.user.email || email,
      displayName: result.user.displayName || email.split("@")[0],
    };
    setUser(appUser);
    setRole(result.role || "STUDENT");
    setDemoUser(appUser, result.role || "STUDENT");
  };

  const logout = async () => {
    const { logout: firebaseLogout } = await import("@/lib/firebase");
    await firebaseLogout();
    setUser(null);
    setRole(null);
    clearDemoUser();
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
