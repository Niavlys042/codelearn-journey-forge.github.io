
import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'sonner';
import { API_BASE_URL, MESSAGES } from '@/utils/config';

interface UseAPIOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
}

const defaultOptions: UseAPIOptions = {
  showSuccessToast: false,
  showErrorToast: true,
};

// Création d'une instance axios configurée
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercepteur pour ajouter le token d'authentification
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Hook personnalisé pour les appels API
export function useAPI<T = any, E = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<E | null>(null);
  const [data, setData] = useState<T | null>(null);

  const request = useCallback(
    async <R = T>(
      method: string,
      url: string,
      body?: any,
      config?: AxiosRequestConfig,
      options?: UseAPIOptions
    ): Promise<R | null> => {
      const opts = { ...defaultOptions, ...options };
      setLoading(true);
      setError(null);

      try {
        let response: AxiosResponse<R>;

        switch (method.toLowerCase()) {
          case 'get':
            response = await apiClient.get<R>(url, config);
            break;
          case 'post':
            response = await apiClient.post<R>(url, body, config);
            break;
          case 'put':
            response = await apiClient.put<R>(url, body, config);
            break;
          case 'patch':
            response = await apiClient.patch<R>(url, body, config);
            break;
          case 'delete':
            response = await apiClient.delete<R>(url, config);
            break;
          default:
            throw new Error(`Méthode HTTP non supportée: ${method}`);
        }

        setData(response.data as unknown as T);
        
        if (opts.showSuccessToast && opts.successMessage) {
          toast.success(opts.successMessage);
        }
        
        return response.data;
      } catch (err) {
        console.error('API error:', err);
        const axiosError = err as AxiosError<E>;
        
        if (axiosError.response) {
          // Le serveur a répondu avec un code d'erreur
          setError(axiosError.response.data as E);
        } else if (axiosError.request) {
          // La requête a été envoyée mais aucune réponse n'a été reçue
          setError({ message: MESSAGES.errors.network } as unknown as E);
        } else {
          // Une erreur s'est produite lors de la configuration de la requête
          setError({ message: MESSAGES.errors.server } as unknown as E);
        }
        
        if (opts.showErrorToast) {
          let errorMessage = MESSAGES.errors.server;
          
          if (axiosError.response && axiosError.response.data && (axiosError.response.data as any).message) {
            errorMessage = (axiosError.response.data as any).message;
          } else if (axiosError.message) {
            errorMessage = axiosError.message;
          }
          
          toast.error(errorMessage);
        }
        
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fonctions pratiques pour différentes méthodes HTTP
  const get = useCallback(
    <R = T>(url: string, config?: AxiosRequestConfig, options?: UseAPIOptions) =>
      request<R>('get', url, undefined, config, options),
    [request]
  );

  const post = useCallback(
    <R = T>(url: string, body?: any, config?: AxiosRequestConfig, options?: UseAPIOptions) =>
      request<R>('post', url, body, config, options),
    [request]
  );

  const put = useCallback(
    <R = T>(url: string, body?: any, config?: AxiosRequestConfig, options?: UseAPIOptions) =>
      request<R>('put', url, body, config, options),
    [request]
  );

  const patch = useCallback(
    <R = T>(url: string, body?: any, config?: AxiosRequestConfig, options?: UseAPIOptions) =>
      request<R>('patch', url, body, config, options),
    [request]
  );

  const del = useCallback(
    <R = T>(url: string, config?: AxiosRequestConfig, options?: UseAPIOptions) =>
      request<R>('delete', url, undefined, config, options),
    [request]
  );

  return {
    loading,
    error,
    data,
    get,
    post,
    put,
    patch,
    del,
    request,
  };
}
