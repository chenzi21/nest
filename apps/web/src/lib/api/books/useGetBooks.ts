import { useQuery } from '@tanstack/react-query';
import type { Book } from '@schema/books/books.schema';
import { apiClient } from '../client';

export const useGetBooks = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: () => apiClient.get<Book[]>('/books'),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
};
