import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createBookSchema,
  type CreateBookSchema,
} from '@schema/books/books.schema';
import { apiClient } from '../client';

export const usePostBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: CreateBookSchema) => {
      let validatedBook: CreateBookSchema;

      /* -------------------- 1. Validate -------------------- */
      try {
        validatedBook = createBookSchema.parse(book);
      } catch (validationError) {
        // Zod throws on invalid data – surface this for callers (React-Query)
        console.error('Book validation failed:', validationError);
        throw validationError;
      }

      /* -------------------- 2. Persist --------------------- */
      return apiClient
        .post('/books', validatedBook)
        .catch((requestError: unknown) => {
          // Log & re-throw so React-Query can trigger its onError handlers
          console.error('Failed to create book:', requestError);
          throw requestError;
        });
    },
    onSuccess: () => {
      // Invalidate and refetch books query after successful creation
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: (error) => {
      console.error('Error creating book:', error);
      // You could add toast notifications here if you have a toast system
    },
  });
};
