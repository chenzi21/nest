/**
 * Get the API base URL for making requests
 * This handles different environments and client/server contexts
 */
export function getApiUrl(): string {
  // In development, always use localhost from the browser's perspective
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8080';
  }

  // In production, use the environment variable if available
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Fallback for production
  return 'http://localhost:8080';
}
