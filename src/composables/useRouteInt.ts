import { computed } from "vue";
import { useRoute } from "vue-router";

export default function useRouteInt(name: string){
    const strValue = computed(() => useRoute().params[name] as string | undefined);
    const valid = computed(() => !!strValue.value && /^[1-9]\d*$/.test(strValue.value));
    const value = computed(() => (valid.value ? Number(strValue.value) : NaN));

    return { valid, value };
}