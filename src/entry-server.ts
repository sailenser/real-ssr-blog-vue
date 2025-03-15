import makeApp from "./main";

export default async function runApp(context:any){
    const apiCache = {};
    const { app, router, store, pinia } = await makeApp({ ssr: true, apiCache });

    store.auth().setUser(null);

    router.push(context.url);

    await Promise.all([
        await router.isReady(),
        await store.sample().initData()
    ])

    return { app, router, store, apiCache, pinia };
}
