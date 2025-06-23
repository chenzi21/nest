'use client';

import { Button } from '@web/components/books/Button';
import { BooksTable } from '@web/components/books/BooksTable';
import { useGetBooks } from '@web/lib/api/books/useGetBooks';

export default function BooksPage() {
  const { data, isLoading, error } = useGetBooks();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-red-800 dark:text-red-200">
                Failed to load books
              </h3>
              <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                {error instanceof Error
                  ? error.message
                  : 'An unexpected error occurred'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Books Collection
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage your book collection with sorting, filtering, and search
                capabilities.
              </p>
              {data && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                  Total books: {data.length}
                </p>
              )}
            </div>
            <div className="mt-4 sm:mt-0">
              <Button />
            </div>
          </div>
        </div>

        {/* Books Table */}
        <BooksTable data={data || []} isLoading={isLoading} />
      </div>
    </div>
  );
}
