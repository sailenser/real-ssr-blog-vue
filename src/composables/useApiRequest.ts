import { inject, ref, type Ref } from "vue";
import useApi from "./useApi";
import { getByDottedKey } from "../shared/object";

interface ApiResult<T = any> {
    pending: boolean;
    done: boolean;
    success: boolean;
    data: T | null;
    error: any;
}

type ApiFunction = (...args: any[]) => Promise<{ data: any }>;

export default function useApiRequest<T = any>(
    apiSchema: string
): [Ref<ApiResult<T>>, (...args: any[]) => Promise<void>] {
    const api = useApi();
    if (!api) {
        throw new Error("API is not available");
    }

    const fnApi: ApiFunction = getByDottedKey(api, apiSchema);

    const result = ref<ApiResult<T>>({
        pending: false,
        done: false,
        success: false,
        data: null,
        error: null,
    }) as Ref<ApiResult<T>>;

    const apiCache = inject<Record<string, any>>("apicache", {});

    async function execute(...args: any[]): Promise<void> {
        const cacheKey = apiSchema + JSON.stringify(args);

        if (!import.meta.env.SSR && apiCache[cacheKey]) {
            const data = apiCache[cacheKey] as T;
            result.value = { pending: false, done: true, success: true, data, error: null };
        } else {
            result.value = { pending: true, done: false, success: false, data: null, error: null };

            try {
                const { data } = await fnApi(...args);
                result.value = { pending: false, done: true, success: true, data: data as T, error: null };

                if (import.meta.env.SSR) {
                    apiCache[cacheKey] = data;
                }
            } catch (e) {
                result.value = { pending: false, done: true, success: false, data: null, error: e };
            }
        }
    }

    return [result, execute];
}