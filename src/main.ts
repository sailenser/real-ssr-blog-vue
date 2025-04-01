import { createSSRApp, createApp } from 'vue'
import App from './App.vue'
import createRouter from './router';
import { createApi } from "./api";
import createHttpPlugin from './plugins/http';
import { createPinia } from 'pinia';
import createStore from './store';
import initPagesAuthGuard from './connectors/initPagesAuthGuard'
import initHttpAuthToken from './connectors/initHttpAuthToken';
export default async function makeApp(context:any){
    const createRealApp = context.ssr ? createSSRApp : createApp;
    const app = createRealApp(App);
    // const http = createHttpPlugin('http://api-my-ssr-dev.ru:8876/api');
    // const http = createHttpPlugin('http://localhost:8876/api');
    const http = createHttpPlugin('http://api-blog-srr.fronterbest.ru/api');
    const router = createRouter();
    const api = createApi(http);
    const pinia = createPinia();
    const store = createStore(pinia, api);

    app.use(router);
    app.use(pinia);

    app.provide('api', api);
    app.provide('store', store);
    app.provide('apicache', context.apiCache);

    //если это не ssr страницы, а личный кабинет запускаем проверки связанные с аутентификацией и авторизацией
    if(!import.meta.env.SSR) {
        initPagesAuthGuard(router, store.auth);
        initHttpAuthToken(http);
    }

    return { app, store, api, http, pinia, router };
}