import { useEffect, useRef } from "react";
import * as THREE from "three";
import { InteractiveSatelliteProps, Department } from "@/types";

interface CustomMesh extends THREE.Mesh {
  material: THREE.MeshPhongMaterial;
  userData: {
    departmentId: string;
    departmentName: string;
  };
}

interface SceneObjects {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  meshes: CustomMesh[];
}

const InteractiveSatellite: React.FC<InteractiveSatelliteProps> = ({
  onSelectDepartment
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneObjects | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Your existing Three.js setup code...

    sceneRef.current = { scene, camera, renderer, meshes: [] };

    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default InteractiveSatellite;
