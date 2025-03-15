import axios from "axios";
import type { AxiosInstance } from "axios";

export default function createHttpPlugin(baseURL:string):AxiosInstance {
    const http = axios.create({
        baseURL
    })

    return http;
}