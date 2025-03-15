import type { ApiResponse } from "./types.ts"
export interface AuthApi {
    register(userData:User):Promise<ApiResponse<User>>;
    login(userData:User):Promise<ApiResponse<User>>;
    check():Promise<ApiResponse<UserCheck>>;
    logout(id: number):Promise<ApiResponse<User>>;
}

// TODO: тут надо проработать с постоянно возвращемыми данными и не постоянно возвращаемыми, убрать лишние ?
export type User = {
    id?: number;
    name?: string;
    email?: string;
    roles?: string;
    password?: string;
    password_confirmation?: string;
}

export type UserCheck = {
    user: object;
    auth: boolean;
}
