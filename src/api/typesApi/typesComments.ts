export type Comments = {
    id: number;
    parent_id: number | null;
    users_id: number;
    posts_id: number;
    content: string;
}

export interface CommentsApi {
    all(postId: number):Promise<Comments[]>;
}