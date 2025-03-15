import type { AxiosInstance, AxiosResponse } from "axios";
import type { User, AuthApi } from "./typesApi/typesUser.ts"
import type { ApiResponse } from "./typesApi/types.ts"

declare module 'axios' {
  export interface AxiosRequestConfig {
    errorAlert?: string;
    appSilence401?: boolean;
  }
}

export default function createAuthApi(http: AxiosInstance):AuthApi {
  return {
    async register({name, email, password, password_confirmation}:User):Promise<ApiResponse<User>> {
      let { data }: AxiosResponse<ApiResponse<User>> = await http.post('auth/register', { name, email, password, password_confirmation }, {
        errorAlert: 'при попытке логина'
      });

      return data;
    },
    async login({ name, password }:User):Promise<ApiResponse<User>> {
      let { data }: AxiosResponse<ApiResponse<User>> = await http.post('auth/login', { name, password }, {
        errorAlert: 'при попытке логина'
      });

      return data;
    },
    async check(){
      try {
        let { data } = await http.post('auth/check', {
          appSilence401: true
        });
        return data;
      }
      catch(e){
        return { res: false };
      }
    },
    async logout(){
      let { data } = await http.post('auth/logout', {
        errorAlert: 'при попытке выхода с сайта'
      });

      return data;
    }
  }
}