'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Books page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong!
        </h2>

        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4 max-w-md">
          <p className="text-red-800 text-sm">
            <strong>Error:</strong> {error.message}
          </p>
          {error.digest && (
            <p className="text-red-600 text-xs mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="space-x-2">
          <button
            onClick={() => reset()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}
