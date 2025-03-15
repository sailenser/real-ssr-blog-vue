import createAuthStore from './auth.ts';
import createSampleStore from "./sample.ts";
import createPageStore from "./page.ts";

export default function createStore(pinia:any, api:any) {
    const auth = createAuthStore(api.auth).bind(null, pinia);
    const sample = createSampleStore(api.posts).bind(null, pinia);
    const page = createPageStore().bind(null, pinia);

    return {
        auth,
        sample,
        page
    };
}