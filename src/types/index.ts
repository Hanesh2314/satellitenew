// Three.js related types
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

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type AsyncFunction<T = void> = () => Promise<T>;

export type ErrorWithMessage = {
  message: string;
  code?: string;
  status?: number;
};

// Event types
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
