import { useState } from "react";
import { useLocation } from "wouter";
import InteractiveSatellite from "@/components/InteractiveSatellite";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const DepartmentSelectionPage = () => {
  const [, navigate] = useLocation();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const handleDepartmentSelect = (departmentId: string, departmentName: string) => {
    setSelectedDepartment(departmentId);
  };

  const handleContinue = () => {
    if (selectedDepartment) {
      navigate(`/department/${selectedDepartment}`);
    }
  };

  return (
    <div className="min-h-screen bg-stellar-dark text-white relative">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Select Your Department</h1>
          <p className="text-lg text-gray-300">
            Choose the department you'd like to join in our satellite project
          </p>
        </div>

        <div className="relative h-[600px] mb-8">
          <InteractiveSatellite onSelectDepartment={handleDepartmentSelect} />
        </div>

        {selectedDepartment && (
          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              className="bg-stellar-blue hover:bg-stellar-blue/90 text-white px-6 py-2"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentSelectionPage;
