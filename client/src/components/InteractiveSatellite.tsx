import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Department {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  color: number;
}

interface CustomMesh extends THREE.Mesh {
  material: THREE.MeshPhongMaterial;
}

const departments: Department[] = [
  { 
    id: "power-system", 
    name: "Power System", 
    position: { x: -3, y: 0, z: 0 }, 
    color: 0x1E88E5 
  },
  { 
    id: "onboard-computer", 
    name: "On-Board Computer", 
    position: { x: 0, y: 0, z: 0 }, 
    color: 0x6A0DAD 
  },
  { 
    id: "communication-system", 
    name: "Communication System", 
    position: { x: 0, y: 2.5, z: 0 }, 
    color: 0xFFC107 
  },
  { 
    id: "adcs", 
    name: "Altitude Determination & Control", 
    position: { x: 0, y: -1, z: 1 }, 
    color: 0x4CAF50 
  }
];

export function InteractiveSatellite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRefs = useRef<Record<string, CustomMesh>>({});
  const [scene] = useState(new THREE.Scene());
  const [camera] = useState(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const [renderer] = useState(new THREE.WebGLRenderer({ antialias: true }));
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    camera.position.z = 5;

    departments.forEach((dept) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ color: dept.color });
      const mesh = new THREE.Mesh(geometry, material) as CustomMesh;
      mesh.position.set(dept.position.x, dept.position.y, dept.position.z);
      meshRefs.current[dept.id] = mesh;
      scene.add(mesh);
    });

    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight);
    scene.add(directionalLight);

    function animate() {
      requestAnimationFrame(animate);
      Object.values(meshRefs.current).forEach((mesh) => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '100vh' }}
      onMouseMove={(e) => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(Object.values(meshRefs.current));
        
        if (intersects.length > 0) {
          const hoveredMesh = intersects[0].object as CustomMesh;
          const department = departments.find(
            dept => meshRefs.current[dept.id] === hoveredMesh
          );
          if (department) {
            setHoveredDepartment(department.id);
            hoveredMesh.material.color.setHex(0xff0000);
          }
        } else {
          if (hoveredDepartment) {
            const prevMesh = meshRefs.current[hoveredDepartment];
            const department = departments.find(dept => dept.id === hoveredDepartment);
            if (department) {
              prevMesh.material.color.setHex(department.color);
            }
            setHoveredDepartment(null);
          }
        }
      }}
    />
  );
}

export default InteractiveSatellite;
