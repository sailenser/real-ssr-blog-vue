import { inject } from "vue";

export default function useApi():object | undefined {
    return inject('api');
}