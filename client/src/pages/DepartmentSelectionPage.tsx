import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import InteractiveSatellite from "@/components/InteractiveSatellite";
import { departments } from "@/lib/satelliteUtils";
import { getDepartmentDetails } from "@/lib/departmentDetails";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DepartmentSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const handleSelectDepartment = useCallback((departmentId: string, departmentName: string) => {
    setSelectedDepartment(departmentId);
    setShowDetailsDialog(true);
  }, []);

  const handleApplyNow = useCallback(() => {
    if (selectedDepartment) {
      navigate(`/apply/${selectedDepartment}`);
    }
    setShowDetailsDialog(false);
  }, [navigate, selectedDepartment]);

  const departmentDetails = selectedDepartment ? getDepartmentDetails(selectedDepartment) : null;
  const selectedDeptInfo = selectedDepartment ? departments.find(d => d.id === selectedDepartment) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4 py-12 page-transition active">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-bold text-star-white mb-4">
          Choose Your Department
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Select a satellite subsystem that matches your expertise
        </p>
      </div>
      <InteractiveSatellite onSelectDepartment={handleSelectDepartment} />
      
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent>
          {selectedDeptInfo && departmentDetails && (
            <>
              <DialogTitle>{selectedDeptInfo.name}</DialogTitle>
              <DialogDescription>{departmentDetails.description}</DialogDescription>
              <div className="mt-4">
                <Button onClick={handleApplyNow} className="w-full">
                  Apply Now
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentSelectionPage;
