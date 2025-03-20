import { Department } from "@/types";

const departments: Record<string, Department> = {
  "power-system": {
    id: "power-system",
    name: "Power System",
    position: { x: -3, y: 0, z: 0 },
    color: 0x1E88E5
  },
  "onboard-computer": {
    id: "onboard-computer",
    name: "On-Board Computer",
    position: { x: 0, y: 0, z: 0 },
    color: 0x6A0DAD
  },
  // Add other departments...
};

export function getDepartmentById(id: string): Department | null {
  return departments[id] || null;
}

export function getAllDepartments(): Department[] {
  return Object.values(departments);
}
