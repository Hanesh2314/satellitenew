import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Department } from '@/types';

interface Satellite3DProps {
  department?: Department;
  rotationSpeed?: number;
  autoRotate?: boolean;
}

interface SatelliteScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  model: THREE.Group;
  lights: {
    ambient: THREE.AmbientLight;
    point: THREE.PointLight;
    directional: THREE.DirectionalLight;
  };
}

const Satellite3D: React.FC<Satellite3DProps> = ({
  department,
  rotationSpeed = 0.005,
  autoRotate = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SatelliteScene | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // Lights setup
    const lights = {
      ambient: new THREE.AmbientLight(0xffffff, 0.5),
      point: new THREE.PointLight(0xffffff, 0.5),
      directional: new THREE.DirectionalLight(0xffffff, 0.5),
    };

    scene.add(lights.ambient);
    scene.add(lights.point);
    scene.add(lights.directional);

    // Model setup
    const model = new THREE.Group();
    scene.add(model);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      model,
      lights,
    };

    // Animation
    const animate = () => {
      if (!sceneRef.current) return;

      if (autoRotate) {
        model.rotation.y += rotationSpeed;
      }

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [autoRotate, rotationSpeed]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default Satellite3D;
