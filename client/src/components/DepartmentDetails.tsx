import { Button } from "@/components/ui/button";

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

// Define props interface for the component
export interface DepartmentDetailsProps {
  details: DepartmentDetail;
  basicInfo: Department;
  onApply: () => void;
}

const DepartmentDetails: React.FC<DepartmentDetailsProps> = ({
  details,
  basicInfo,
  onApply
}) => {
  return (
    <div className="bg-stellar-dark/80 p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">{basicInfo.name}</h2>
      <p className="text-gray-300 mb-6">{basicInfo.description}</p>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-3">{details.title}</h3>
        <p className="text-gray-300">{details.description}</p>
      </div>

      {details.requirements && details.requirements.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-2">Requirements</h4>
          <ul className="list-disc list-inside text-gray-300">
            {details.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {details.responsibilities && details.responsibilities.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-2">Responsibilities</h4>
          <ul className="list-disc list-inside text-gray-300">
            {details.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
      )}

      <Button
        onClick={onApply}
        className="bg-stellar-blue hover:bg-stellar-blue/90 text-white"
      >
        Apply Now
      </Button>
    </div>
  );
};

export default DepartmentDetails;
