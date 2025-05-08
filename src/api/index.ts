import createPostsApi from "./posts";
import createAuthApi from "./auth";
import createCommentsApi from "./comments.ts";
import createUsersApi from "./user.ts";

import type { AxiosInstance } from "axios";
import type { PostsApi } from "./typesApi/typesPost.ts";
import type { AuthApi, UsersApi } from "./typesApi/typesUser.ts";
import type { CommentsApi } from "./typesApi/typesComments.ts";

type Api =  {
    auth: AuthApi;
    posts: PostsApi;
    comments: CommentsApi;
    users: UsersApi;
}

export function createApi(http:AxiosInstance): Api {
    return {
        auth: createAuthApi(http),
        posts: createPostsApi(http),
        comments: createCommentsApi(http),
        users: createUsersApi(http),
    }
}
