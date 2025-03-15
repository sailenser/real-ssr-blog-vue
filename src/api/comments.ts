import type {AxiosInstance} from "axios";
import type {ApiResponse} from "./typesApi/types.ts";
import type {Comments, CommentsApi} from "./typesApi/typesComments.ts";

export default function createCommentsApi(http: AxiosInstance): CommentsApi {
    return {
        async all(postId) {
            const response: ApiResponse<Comments[]> = await http.get(`/comments/post/${postId}`);
            return response.data;
        },
    }
}