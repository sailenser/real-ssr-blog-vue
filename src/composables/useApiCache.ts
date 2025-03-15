import { inject } from "vue";

export default function useApiCache(): Record<string, any> | undefined {
    return inject<Record<string, any>>('apicache');
}