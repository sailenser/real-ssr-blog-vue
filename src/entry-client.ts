import makeApp from "./main";
import '@/assets/styles/index.scss'

(async function(){
    const context = {
        ssr: window.appServerData.ssr,
        apiCache: window.appServerData.apiCache
    };

    const { app, api, store, router, pinia } = await makeApp(context);

    api.auth.check().then(response => store.auth().setUser(response.data.auth ? response.data.user : null));

    if(window.appServerData.store) {
        pinia.state.value = window.appServerData.store;
    }
    else{
        await store.sample().initData(); // попадаем сюда только если ssr -> error(всему сайту ппц вообщем)
    }

    await router.isReady();
    app.mount('#app');

    // тайминг для кэша
    setTimeout(() => {
        Object.keys(context.apiCache).forEach(key => delete context.apiCache[key]);
    }, 300);
})();