import { inject } from "vue";

export default function useStore<T = any>(...names: string[]): T[] {
    const store = inject<Record<string, () => T>>('store');
    if (!store) {
        throw new Error("Store is not available");
    }

    return names.map(name => store[name]());
}