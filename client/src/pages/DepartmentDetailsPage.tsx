import { useParams, useLocation } from "wouter";
import { getDepartmentDetails } from "@/lib/departmentDetails";
import { getDepartmentById } from "@/lib/satelliteUtils";
import { Button } from "@/components/ui/button";
import DepartmentDetails from "@/components/DepartmentDetails";
import { ArrowLeft } from "lucide-react";

// Define interfaces for the department types
interface Department {
  id: string;
  name: string;
  description?: string;
}

interface DepartmentDetail {
  title: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
}

// Define props interface for the DepartmentDetails component
interface DepartmentDetailsProps {
  details: DepartmentDetail;
  basicInfo: Department;
  onApply: () => void;
}

const DepartmentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  
  const departmentDetails = id ? getDepartmentDetails(id) : null;
  const departmentBasic = id ? getDepartmentById(id) : null;
  
  const handleApply = () => {
    if (id) {
      navigate(`/apply/${id}`);
    }
  };
  
  if (!departmentDetails || !departmentBasic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="bg-deep-blue bg-opacity-80 p-8 rounded-xl max-w-lg border border-satellite-blue text-white">
          <h2 className="text-2xl font-bold text-stellar-yellow mb-4">Department Not Found</h2>
          <p className="mb-6">The department you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate("/departments")}
            className="bg-satellite-blue text-white hover:bg-satellite-blue/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Departments
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative z-10">
      <DepartmentDetails 
        details={departmentDetails} 
        basicInfo={departmentBasic} 
        onApply={handleApply}
      />
    </div>
  );
};

export default DepartmentDetailsPage;
