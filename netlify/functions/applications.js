import { storage } from './lib/storage.js';

export const handler = async function(event, context) {
  const path = event.path;
  const httpMethod = event.httpMethod;
  
  // CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
  
  try {
    // Handle OPTIONS request (CORS preflight)
    if (httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      };
    }
    
    // TEST endpoint
    if (httpMethod === 'GET' && 
        (path === '/.netlify/functions/applications/test' || 
         path === '/api/applications/test')) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'Applications API is working!',
          timestamp: new Date().toISOString()
        })
      };
    }
    
    // GET all applications
    if (httpMethod === 'GET' && 
        (path === '/.netlify/functions/applications' || 
         path === '/api/applications')) {
      const applications = await storage.getApplications();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(applications)
      };
    }
    
    // GET application by ID
    const applicationIdRegex = /^\/(?:\.netlify\/functions\/applications|api\/applications)\/(\d+)$/;
    const matchApplicationId = path.match(applicationIdRegex);
    
    if (httpMethod === 'GET' && matchApplicationId) {
      const id = parseInt(matchApplicationId[1]);
      const application = await storage.getApplicationById(id);
      
      if (!application) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Application not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(application)
      };
    }
    
    // POST: Create a new application
    if (httpMethod === 'POST' && 
        (path === '/.netlify/functions/applications' || 
         path === '/api/applications')) {
      
      const data = JSON.parse(event.body);
      
      // Validate required fields
      if (!data.name || !data.department || !data.branch || !data.year) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            error: 'Missing required fields',
            message: 'Name, department, branch, and year are required fields.' 
          })
        };
      }
      
      const newApplication = await storage.createApplication(data);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newApplication)
      };
    }
    
    // GET resume by application ID
    const resumeRegex = /^\/(?:\.netlify\/functions\/applications|api\/applications)\/(\d+)\/resume$/;
    const matchResume = path.match(resumeRegex);
    
    if (httpMethod === 'GET' && matchResume) {
      const id = parseInt(matchResume[1]);
      const application = await storage.getApplicationById(id);
      
      if (!application || !application.hasResume) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Resume not found' })
        };
      }
      
      // For demonstration purposes, returning a placeholder
      // In a real implementation, we would get and return the actual resume data
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/pdf'
        },
        body: 'Sample resume content would be returned here',
        isBase64Encoded: false
      };
    }
    
    // Route not found
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ 
        error: 'Not found',
        path: path,
        method: httpMethod 
      })
    };
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};
