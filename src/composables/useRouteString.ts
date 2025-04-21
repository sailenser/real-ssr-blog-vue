import { computed } from "vue";
import { useRoute } from "vue-router";

export default function useRouteString(name: string){
    const strValue = computed(() => useRoute().params[name] as string | undefined);
    const valid = computed(() => !!strValue.value && /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(strValue.value));
    const result = computed(() => (valid.value ? String(strValue.value) : NaN));

    return { valid, result };
}