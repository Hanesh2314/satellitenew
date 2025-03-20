import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ApplicantDetails {
  id: string;
  name: string;
  contactInfo: string;
  department: string;
  experience?: string;
  resumeUrl?: string;
}

interface ApplicantDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: ApplicantDetails;
  onStatusChange: (status: 'approved' | 'rejected') => Promise<void>;
}

const ApplicantDetailsModal: React.FC<ApplicantDetailsModalProps> = ({
  isOpen,
  onClose,
  applicant,
  onStatusChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Applicant Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Name</h4>
            <p>{applicant.name}</p>
          </div>
          {/* Other applicant details */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantDetailsModal;
