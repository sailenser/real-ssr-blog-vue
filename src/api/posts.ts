import type { AxiosInstance } from "axios";
import type { CategoryPost, Post, PostsApi } from "./typesApi/typesPost.ts"
import type { ApiResponse } from "./typesApi/types.ts"
export default function createPostsApi(http: AxiosInstance): PostsApi {
    return {
        async all() {
            const response: ApiResponse<Post[]> = await http.get('/posts');
            return response.data;
        },
        async one(id) {
            const response: ApiResponse<Post> = await http.get(`/posts/${id}`);
            return response.data;
        },
        async create({url, title, contents, description, category_id}) {
            const reponse = await http.post(`/posts`, { url, title, contents, description, category_id });
            return reponse.data;
        },
        async update({id, url, title, contents}){
            const reponse = await http.put(`/posts/${id}`, { id, url, title, contents });
            return reponse.data;
        },
        async remove(id){
            const reponse = await http.delete(`/posts/${id}`);
            return reponse.data;
        },
        async category() {
            const response: ApiResponse<CategoryPost[]> = await http.get('/category');
            return response.data;
        },
        async categoryPosts(id) {
            const response: ApiResponse<Post[]> = await http.get(`/category/${id}`);
            return response.data;
        },
    };
}