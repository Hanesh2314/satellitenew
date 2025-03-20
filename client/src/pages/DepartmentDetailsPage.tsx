import { useParams, useLocation } from "wouter";
import { getDepartmentDetails } from "@/lib/departmentDetails";
import { getDepartmentById } from "@/lib/satelliteUtils";
import { Button } from "@/components/ui/button";
import DepartmentDetails from "@/components/DepartmentDetails";
import { ArrowLeft } from "lucide-react";
import { Department, DepartmentDetail } from "@/types";

interface RouteParams {
  id: string;
}

const DepartmentDetailsPage = () => {
  const { id } = useParams<RouteParams>();
  const [, navigate] = useLocation();
  
  const departmentDetails = id ? getDepartmentDetails(id) : null;
  const departmentBasic = id ? getDepartmentById(id) : null;
  
  const handleApply = () => {
    if (id) {
      navigate(`/apply/${id}`);
    }
  };

  const handleBack = () => {
    navigate('/departments');
  };

  if (!departmentDetails || !departmentBasic) {
    return (
      <div className="min-h-screen bg-stellar-dark text-white flex items-center justify-center">
        <p>Department not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stellar-dark text-white">
      <div className="container mx-auto px-4 py-10">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="text-white mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Departments
        </Button>

        <DepartmentDetails
          details={departmentDetails}
          basicInfo={departmentBasic}
          onApply={handleApply}
        />
      </div>
    </div>
  );
};

export default DepartmentDetailsPage;
