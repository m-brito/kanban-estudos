import axios, { AxiosRequestConfig } from "axios";

import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_URL!,
});

export const get = async <T>(path: string, options?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await api.get<T>(path, options);
    return response.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export const post = async <T>({
  path,
  successMessage,
  data,
  options
}: {
  path: string;
  successMessage?: string;
  data: any;
  options?: AxiosRequestConfig;
}): Promise<T> => {
  try {
    const response = await api.post<T>(path, data, options);
    if (successMessage) {
      toast.success(successMessage);
    }
    return response.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const handleRequestError = (error: any) => {
  if (error.response) {
    const errorMessage = error.response.data.message || error.response.statusText || "An error occurred";
    toast.error(errorMessage);
  } else {
    toast.error("An unexpected error occurred");
  }
};
