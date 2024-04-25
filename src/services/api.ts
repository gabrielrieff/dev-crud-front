import { parseCookies } from "nookies";
import axios, { AxiosError } from "axios";
import { AuthTokenError } from "./errors/authTokenErro";

export function apiClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const baseURL = process.env.BASE_URL;

  const api = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${cookies["@nextauth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          //signOut();
          return;
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}

export const api = apiClient();
