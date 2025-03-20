// Add these to your existing types/index.ts
export interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    role: 'user' | 'admin';
  } | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export interface QueryContextType {
  isLoading: boolean;
  error: Error | null;
  data: unknown;
}
