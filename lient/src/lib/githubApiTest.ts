/**
 * Utility function to test GitHub API accessibility
 * @returns Promise<boolean> indicating if the API is accessible
 */
export async function testGitHubAPI(): Promise<{
  isAccessible: boolean;
  message: string;
}> {
  try {
    const response = await fetch('https://api.github.com/zen');
    if (response.ok) {
      const message = await response.text();
      return {
        isAccessible: true,
        message: `GitHub API is accessible: ${message}`
      };
    } else {
      return {
        isAccessible: false,
        message: `GitHub API returned error: ${response.status}`
      };
    }
  } catch (error) {
    return {
      isAccessible: false,
      message: `Failed to access GitHub API: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Helper function to check rate limits
 * @returns Promise with rate limit information
 */
export async function checkGitHubRateLimit() {
  try {
    const response = await fetch('https://api.github.com/rate_limit');
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        limits: data.rate
      };
    }
    return {
      success: false,
      message: `Failed to get rate limits: ${response.status}`
    };
  } catch (error) {
    return {
      success: false,
      message: `Error checking rate limits: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
