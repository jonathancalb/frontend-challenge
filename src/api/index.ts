/**
 * API Client Factory
 * Automatically chooses between mock and real API based on environment
 */

// Check if we're in development mode or if no API key is provided
const isDevelopmentMode = () => {
  return (import.meta as any).env?.MODE === 'development' || !(import.meta as any).env?.VITE_API_KEY;
};

// Dynamic import based on environment
let clientInstance: any = null;

export const getApiClient = async () => {
  if (clientInstance) {
    return clientInstance;
  }

  if (isDevelopmentMode()) {
    // Use mock client in development
    const { mockApiClient } = await import('../mocks/api/client');
    clientInstance = mockApiClient;
  } else {
    // Use real client in production
    const { apiClient } = await import('./client');
    clientInstance = apiClient;
  }

  return clientInstance;
};

// For backwards compatibility and easier imports
export const createApiClient = getApiClient;
