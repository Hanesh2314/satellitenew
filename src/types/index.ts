import { ComponentProps } from 'react';
import * as ToastPrimitives from "@radix-ui/react-toast";

// Base Types
export interface Department {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  color: number;
}

// Component Props
export interface InteractiveSatelliteProps {
  onSelectDepartment: (departmentId: string, departmentName: string) => void;
}

// Toast Types
export interface ToastProps extends ComponentProps<typeof ToastPrimitives.Root> {
  variant?: 'default' | 'destructive';
}

export interface ToastActionElement {
  altText?: string;
  action: () => void;
}

export type ToasterToast = ToastProps & {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
}

export interface State {
  toasts: ToasterToast[];
}

// Route Types
export interface RouteParams {
  id?: string;
  department?: string;
}
