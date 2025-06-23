'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Global error handling
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors (client errors)
              if (error && 'status' in error && (error as any).status < 500) {
                return false;
              }
              // Retry up to 3 times for 5xx errors
              return failureCount < 3;
            },
          },
          mutations: {
            // Global error handling for mutations
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
