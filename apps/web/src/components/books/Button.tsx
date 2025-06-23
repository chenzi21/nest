'use client';

import { usePostBook } from '@web/lib/api/books/usePostBook';

export const Button = () => {
  const { mutate, isPending: isPosting } = usePostBook();

  const handleAddBook = () => {
    mutate({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description:
        'A classic American novel set in the Jazz Age that tells the story of Jay Gatsby and his pursuit of the American Dream.',
      price: 12.99,
      pages: 180,
      publisher: 'Scribner',
      published: new Date('1925-04-10'),
      genre: 'Fiction',
      inStock: 25,
    });
  };

  return (
    <button
      onClick={handleAddBook}
      disabled={isPosting}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isPosting ? (
        <>
          <svg
            className="w-4 h-4 mr-2 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Adding Book...
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Sample Book
        </>
      )}
    </button>
  );
};
