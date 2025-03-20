import { DepartmentDetail } from "@/types";

const departmentDetails: Record<string, DepartmentDetail> = {
  "power-system": {
    title: "Power System Department",
    description: "Responsible for satellite power generation, storage, and distribution",
    requirements: [
      "Knowledge of power electronics",
      "Understanding of solar panels and batteries",
      "Basic circuit design experience"
    ],
    responsibilities: [
      "Design power distribution system",
      "Solar panel configuration",
      "Battery management"
    ]
  },
  "onboard-computer": {
    title: "On-Board Computer Department",
    description: "Handles satellite's main computing and control systems",
    requirements: [
      "Programming experience in C/C++",
      "Understanding of embedded systems",
      "Knowledge of real-time operating systems"
    ],
    responsibilities: [
      "Develop flight software",
      "System integration",
      "Hardware-software interface"
    ]
  },
  // Add other departments...
};

export function getDepartmentDetails(id: string): DepartmentDetail | null {
  return departmentDetails[id] || null;
}
