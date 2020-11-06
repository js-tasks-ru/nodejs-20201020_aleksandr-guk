const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

let NEW_MESSAGE = null;
let activeClients = [];
router.get('/subscribe', async (ctx, next) => {
    const r = ctx.query.r || Math.random();
    const newMessage = await getNewMessage(r);
    clearNewMessage();
    ctx.status = 200;
    ctx.body = newMessage;
    return next();
});

router.post('/publish', async (ctx, next) => {
     const {message} = ctx.request.body ?  ctx.request.body : {message: null};
     if ( !message ) {
         ctx.status = 500;
         ctx.body = 'Message is empty';
         return next();
     }
     NEW_MESSAGE = message;
     ctx.status = 201;
     ctx.body = "ok";
     return next();
});

function clearNewMessage() {
    if ( activeClients.length === 0 ) {
        NEW_MESSAGE = null;
    }
}

async function getNewMessage(r) {
    activeClients.push(r);
    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            if ( NEW_MESSAGE ) {
                clearInterval(intervalId);
                activeClients = activeClients.filter(client => r !== client);
                resolve(NEW_MESSAGE);
            }
        }, 10)
    });
}

app.use(router.routes());

module.exports = app;
