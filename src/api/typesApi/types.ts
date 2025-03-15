export interface ApiResponse<T> {
    res: boolean;
    error?: string;
    data: T;
}