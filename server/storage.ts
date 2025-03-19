import { DatabaseStorage } from '../../server/storage';

const storage = new DatabaseStorage();

export const handler = async function(event) {
  const httpMethod = event.httpMethod;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  try {
    // Handle OPTIONS (CORS preflight)
    if (httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }

    if (httpMethod === 'GET') {
      // Fetch stored applications from PostgreSQL
      const applications = await storage.getApplications();
      return { statusCode: 200, headers, body: JSON.stringify(applications) };
    }

    if (httpMethod === 'POST') {
      // Parse incoming form submission
      const body = JSON.parse(event.body);
      const newApplication = await storage.createApplication(body);
      return { statusCode: 201, headers, body: JSON.stringify(newApplication) };
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request method' }) };
  } catch (error) {
    console.error('Error handling request:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
