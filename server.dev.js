// TODO: Данный файл позволяет нам автоматически билдить изменения сервера и клиента на лету весь ssr не пересобирая в ручную
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import { renderToString } from 'vue/server-renderer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
    const app = express();

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl

        try {
            let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
            template = await vite.transformIndexHtml(url, template);

            const createServerApp = (await vite.ssrLoadModule('/src/entry-server.js')).default;
            const { app, router, apiCache, pinia, store } = await createServerApp({ url });

            const { matched } = router.currentRoute.value;
            const nossr = matched.some(r => r.meta.guest || r.meta.auth);
            let pageStatus = 200;
            let pageTitle = '';

            if(!nossr){
                const innerHtml = await renderToString(app);
                template = template.replace(`<!--ssr-content-->`, innerHtml);

                const pageStore = store.page();
                pageStatus = pageStore.status;
                pageTitle = pageStore.title;
            }

            // TODO: делать или не делать, оба варианта приемлемы - оставил пока что
            /* if(pageStatus !== 200){
                nossr = false;
            } */

            // TODO: прокидываем ключи такие для остутсвия лишних запросов на сервер
            // TODO: передача данных со стороны сервера на сторону клиента("ssr":true,"apiCache":{})
            const serverData = {
                ssr: !nossr,
                apiCache,
                store: pinia.state.value
            }

            // TODO: в проде нельзя вот так вот заюзать JSON.stringify это потенциальная дыра в безопасности -> надо привести к безопасному json
            // TODO: JSON.stringify по факту надо защитить от injection
            // TODO: гуглить ---> json-stringify-safe injection чтобы обезопаситься
            template = template.replace(
                '<!--ssr-data-->',
                `<script>window.appServerData = ${JSON.stringify(serverData)}</script>`
            ).replace(
                '<!--ssr-title-->',
                pageTitle
            );

            res.status(pageStatus).set({ 'Content-Type': 'text/html' }).end(template)
        } catch (e) {
            vite.ssrFixStacktrace(e)
            next(e)
        }
    });

    app.listen(5177)
}

createServer();