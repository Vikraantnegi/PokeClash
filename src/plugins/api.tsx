import axios, {AxiosError} from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
});

export const api = {
  get: async (path: string, params?: object) => {
    return await axiosInstance
      .get(path, {params})
      .then(response => response.data)
      .catch((error: AxiosError) => {
        throw error?.response?.data;
      });
  },
  post: async (path: string, data: any) => {
    return await axiosInstance
      .post(path, data)
      .then(response => response.data)
      .catch((error: AxiosError) => {
        throw error;
      });
  },
  put: async (path: string, data: any) => {
    return await axiosInstance
      .put(path, data)
      .then(response => response.data)
      .catch((error: AxiosError) => {
        throw error;
      });
  },
  delete: async (path: string, params?: object) => {
    return await axiosInstance
      .delete(path, {params})
      .then(response => response.data)
      .catch((error: AxiosError) => {
        throw error;
      });
  },
};

export default api;
