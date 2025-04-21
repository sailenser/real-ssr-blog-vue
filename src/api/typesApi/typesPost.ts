import type {ApiResponse} from "./types.ts";

export type Post = {
    id: number;
    url: string;
    title: string;
    contents: string;
    createdAt: string;
    updatedAt: string;
    user_id: number;
    category_id: number;
    User: UserInfo;
}

export type CategoryPost = {
    id: number;
    name: string;
    url: string;
    parent_id: number | null;
    is_visible: number;
    createdAt: string;
    updatedAt: string;
}

export type UserInfo = {
    id: number;
    login: string
}

export interface PostsApi {
    all():Promise<Post[]>;
    one(id: number):Promise<Post>;
    store(post: Post):Promise<Post>;
    update(post: Post):Promise<Post>;
    remove(id: number):Promise<Post>;
    category():Promise<CategoryPost[]>;
    categoryPosts(id: number):Promise<Post[]>;
}

export interface CategoryPostsApi {
    category():Promise<ApiResponse<CategoryPost[]>>;
}