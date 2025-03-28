import runApp from './dist-ssr/entry-server.js'
import { renderToString } from 'vue/server-renderer';
import { readFileSync } from 'fs';
const template = readFileSync('./dist/index.html').toString('utf-8')

import express from 'express'
const app = express()

app.use('/assets', express.static('dist/assets'));

app.get('*', async function(req, resp) {
    console.log(`--------start ${req.url}------------`);
    const { app, router } = await runApp(req.url);
    const { matched } = router.currentRoute.value;
    const nossr = matched.some(r => r.meta.guest || r.meta.auth);

    if(nossr){
        return resp.end(template);
    }

    renderToString(app).then(html => {
        console.log(template);
        console.log(html);
        const page = template.replace('<!--ssr-content-->', html);
        resp.end(page);
        console.log('--------end------------');
    })
})

app.listen(8089)