import axios, { AxiosRequestConfig } from "axios";

import { COOKIE_USER_TOKEN } from "../context/AuthContext";
import Cookies from 'js-cookie';

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
  data,
  options
}: {
  path: string;
  data: any;
  options?: AxiosRequestConfig;
}): Promise<T> => {
  try {
    console.log(api.defaults)
    const response = await api.post<T>(path, data, options);
    return response.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const handleRequestError = (error: any) => {
  if (error.response.status === 401) {
    Cookies.remove(COOKIE_USER_TOKEN);
    location.href = "/";
  }
  console.error('Erro na requisição:', error);
  throw new Error('Ocorreu um erro na requisição.');
};

export const setTokenInterceptor = (token: any) => {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
