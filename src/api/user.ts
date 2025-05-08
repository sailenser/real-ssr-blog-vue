import type { AxiosInstance } from "axios";
import type { UsersApi, User } from "./typesApi/typesUser.ts";
import type { ApiResponse } from "./typesApi/types.ts";

export default function createUsersApi(http: AxiosInstance): UsersApi {
    return {
        async one(id) {
            const response: ApiResponse<User> = await http.get(`/auth/user/${id}`);
            return response.data;
        },
        async update({id, name, email, roles, password, password_confirmation}){
            const reponse = await http.put(`/auth/user/${id}`, { id, name, email, roles, password, password_confirmation });
            return reponse.data;
        },
    }
};