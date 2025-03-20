import { ComponentProps } from 'react';
import * as THREE from 'three';
import * as ToastPrimitives from '@radix-ui/react-toast';

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

export interface DepartmentSelectionProps {
  onSelectDepartment: (departmentId: string, departmentName: string) => void;
}

// Your existing Three.js related types
export interface ThreeJSScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

export interface ModelProperties {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
}

export interface LightSetup {
  ambient: THREE.AmbientLight;
  point: THREE.PointLight;
  directional: THREE.DirectionalLight;
}

// Your existing Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type AsyncFunction<T = void> = () => Promise<T>;

export type ErrorWithMessage = {
  message: string;
  code?: string;
  status?: number;
};

// Your existing Event types
export interface CustomEvent<T = any> {
  type: string;
  payload: T;
  timestamp: number;
}

export type EventHandler<T = any> = (event: CustomEvent<T>) => void;

export interface EventBus {
  on: (event: string, handler: EventHandler) => void;
  off: (event: string, handler: EventHandler) => void;
  emit: <T>(event: string, payload: T) => void;
}
