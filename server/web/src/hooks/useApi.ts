import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../services/apiClient';
import { useEnhancedAppStore } from '../store/enhancedAppStore';
import type { ApiResponse } from '../types/api';

interface UseApiOptions {
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T>(
  endpoint: string,
  options: UseApiOptions = {}
): {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useEnhancedAppStore();

  const fetchData = useCallback(async () => {
    if (!options.enabled && options.enabled !== undefined) return;

    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse<T> = await apiClient.get(endpoint);
      setData(response.data);
      options.onSuccess?.(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
      addNotification({ message: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [endpoint, options.enabled, options.onSuccess, options.onError, addNotification]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, options.refetchInterval]);

  return { data, loading, error, refetch: fetchData };
}

export function useMutation<T, V = any>(
  mutationFn: (variables: V) => Promise<T>
): {
  mutate: (variables: V) => Promise<T>;
  loading: boolean;
  error: string | null;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useEnhancedAppStore();

  const mutate = useCallback(async (variables: V): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const result = await mutationFn(variables);
      addNotification({ message: 'Operation completed successfully', type: 'success' });
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      addNotification({ message: errorMessage, type: 'error' });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFn, addNotification]);

  return { mutate, loading, error };
}