import { storage } from "./lib/storage";

export const handler = async function(event) {
  const path = event.path;
  const httpMethod = event.httpMethod;
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
  
  try {
    if (httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }
    
    if (httpMethod === 'GET' && (path === '/.netlify/functions/applications/test' || path === '/api/applications/test')) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'Applications API is working!',
          timestamp: new Date().toISOString()
        })
      };
    }
    
    if (httpMethod === 'GET') {
      const applications = await storage.getApplications();
      return { statusCode: 200, headers, body: JSON.stringify(applications) };
    }

    if (httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const newApplication = await storage.createApplication(body);
      return { statusCode: 201, headers, body: JSON.stringify(newApplication) };
    }

    return { 
      statusCode: 405, 
      headers, 
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};
