import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../../utils/api-client";

interface UserSession {
  token: string | null;
  user?: any;
}

interface AuthContextValue extends UserSession {
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; message?: string }>;
  register: (payload: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }) => Promise<{ ok: boolean; message?: string }>;
  refreshToken: () => Promise<{ ok: boolean }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return typeof window !== "undefined" ? localStorage.getItem("token") : null;
  });
  const [user, setUser] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = async (email: string, password: string) => {
    console.log("Attempting login with:", {
      email,
      password: password.substring(0, 3) + "...",
    });
    const res = await apiClient.call<any>("auth/login", { email, password });
    console.log("Login response:", res);

    if (res && typeof res === "object" && "error" in res) {
      const error = (res as any).error;
      const message =
        typeof error === "string"
          ? error
          : error?.message || "Authentication failed";
      console.log("Login failed:", message);
      return { ok: false, message };
    }

    // Handle successful response - API returns { success: true, data: { token, user } }
    const response = res as any;
    if (response && response.success && response.data) {
      const { token: t, user: u } = response.data;
      console.log("Login successful, setting token and user");
      setToken(t || null);
      setUser(u);
      return { ok: true };
    }

    // Fallback for other response formats
    const { data } = response || {};
    const { token: t, user: u } = data || {};
    setToken(t || null);
    setUser(u);
    return { ok: true };
  };

  const register = async (payload: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }) => {
    const res = await apiClient.call<any>("auth/register", payload);
    if (res && typeof res === "object" && "error" in res) {
      const error = (res as any).error;
      const message =
        typeof error === "string"
          ? error
          : error?.message || "Registration failed";
      return { ok: false, message };
    }
    const { data } = res as any;
    const { token: t, user: u } = data || {};
    setToken(t || null);
    setUser(u);
    return { ok: true };
  };

  const refreshToken = async () => {
    if (!token) return { ok: false };
    const res = await apiClient.call<any>("auth/refresh", { token });
    if (res && typeof res === "object" && "error" in res) {
      setToken(null);
      setUser(undefined);
      return { ok: false };
    }
    const { data } = res as any;
    const { token: t, user: u } = data || {};
    setToken(t || null);
    setUser(u);
    return { ok: true };
  };

  const logout = () => {
    setToken(null);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, register, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
