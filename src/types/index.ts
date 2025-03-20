// Add these to your existing types/index.ts

// Route Parameters
export interface RouteParams {
  id?: string;
  department?: string;
  page?: string;
}

// Auth Types
export interface AdminUser {
  id: string;
  username: string;
  role: 'admin';
  permissions: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Content Management Types
export interface ContentSection {
  id: string;
  title: string;
  content: string;
  lastUpdated: Date;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  children?: NavItem[];
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select';
  options?: { label: string; value: string }[];
  validation?: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}
