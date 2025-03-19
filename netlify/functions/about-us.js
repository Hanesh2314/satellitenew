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
        (path === '/.netlify/functions/about-us/test' || 
         path === '/api/about-us/test')) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'About Us API is working!',
          timestamp: new Date().toISOString()
        })
      };
    }
    
    // GET about us content
    if (httpMethod === 'GET' && 
        (path === '/.netlify/functions/about-us' || 
         path === '/api/about-us')) {
      const aboutUs = await storage.getAboutUs();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(aboutUs || { 
          id: '1', 
          content: 'Welcome to SpaceTechHub! We are a cutting-edge space technology company focused on innovation and exploration.', 
          updatedAt: new Date().toISOString() 
        })
      };
    }
    
    // POST: Update about us content
    if (httpMethod === 'POST' && 
        (path === '/.netlify/functions/about-us' || 
         path === '/api/about-us')) {
      
      const data = JSON.parse(event.body);
      
      if (!data.content) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Content is required' })
        };
      }
      
      const updatedAboutUs = await storage.updateAboutUs(data.content);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(updatedAboutUs)
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
