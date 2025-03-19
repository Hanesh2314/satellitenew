/**
 * In-memory storage implementation for Netlify serverless functions
 */

// Applications storage
let applications = [];
let applicationIdCounter = 1;

// About Us storage
let aboutUs = {
  id: '1',
  content: 'Welcome to SpaceTechHub! We are a cutting-edge technology hub focused on space exploration and innovation. Join our team to contribute to the future of space technology.',
  updatedAt: new Date().toISOString()
};

/**
 * Get all applications
 */
async function getApplications() {
  return applications.map(app => {
    // Don't return the actual resume data in the list to keep response size small
    const { resume, ...appWithoutResume } = app;
    return {
      ...appWithoutResume,
      hasResume: !!app.resume
    };
  });
}

/**
 * Get application by ID
 */
async function getApplicationById(id) {
  const application = applications.find(app => app.id === id);
  
  if (!application) {
    return null;
  }
  
  // Don't return the actual resume data to keep response size small
  const { resume, ...appWithoutResume } = application;
  return {
    ...appWithoutResume,
    hasResume: !!application.resume
  };
}

/**
 * Create a new application
 */
async function createApplication(application) {
  const newApplication = {
    id: applicationIdCounter++,
    name: application.name,
    contactInfo: application.contactInfo || '',
    department: application.department,
    branch: application.branch,
    year: application.year,
    experience: application.experience || '',
    resumeFileName: application.resumeFileName || null,
    resume: application.resume || null,
    createdAt: new Date().toISOString()
  };
  
  applications.push(newApplication);
  
  // Don't return the actual resume data in response
  const { resume, ...appWithoutResume } = newApplication;
  
  return {
    ...appWithoutResume,
    hasResume: !!resume
  };
}

/**
 * Get About Us content
 */
async function getAboutUs() {
  return aboutUs;
}

/**
 * Update About Us content
 */
async function updateAboutUs(content) {
  aboutUs = {
    id: '1',
    content,
    updatedAt: new Date().toISOString()
  };
  
  return aboutUs;
}

// Export all storage methods
export const storage = {
  getApplications,
  getApplicationById,
  createApplication,
  getAboutUs,
  updateAboutUs
};
