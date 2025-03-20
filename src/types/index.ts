// Add to your existing types/index.ts
export interface ApplicationDetails {
  id: string;
  name: string;
  contactInfo: string;
  department: string;
  experience?: string;
  resumeUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

export interface AdminDashboardState {
  applications: ApplicationDetails[];
  isLoading: boolean;
  error: Error | null;
}
