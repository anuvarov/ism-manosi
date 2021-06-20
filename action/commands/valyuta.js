const { Composer } = require('telegraf');
const { bot } = require('../../core/bot');
const { api, admin } = require('../../config');
const fetch = require('node-fetch');
const CronJob = require('cron').CronJob;


fetch(api)
    .then(request => request.json())
    .then(data => getData(data));

const composer = new Composer();

let dollar = '';
let yevro = '';
let rubl = '';

function getData(data) {
    data.filter(el => {
        if (el.code === 'USD') {
            dollar = `
    1 ${el.title} = ${el.cb_price} so'm

NBU bankida:
Sotish narxi:   ${el.nbu_buy_price}
Sotib olish narxi:  ${el.nbu_cell_price}

 ${el.date}
    `
        }
    });

    data.filter(el => {
        if (el.code === 'EUR') {
            yevro = `
    1 ${el.title} = ${el.cb_price} so'm

NBU bankida:
Sotish narxi:   ${el.nbu_buy_price}
Sotib olish narxi:  ${el.nbu_cell_price}

 ${el.date}
    `
        }
    });

    data.filter(el => {
        if (el.code === 'RUB') {
            rubl = `
    1 ${el.title} = ${el.cb_price} so'm

NBU bankida:
Sotish narxi:   ${el.nbu_buy_price}
Sotib olish narxi:  ${el.nbu_cell_price}

 ${el.date}
    `
        }
    });
}

console.log(dollar, yevro, rubl)

composer.hears('dollar', ctx => {
    ctx.replyWithHTML(dollar).then()
});

composer.hears('yevro', ctx => {
    ctx.replyWithHTML(yevro).then()
});

composer.hears('rubl', ctx => {
    ctx.replyWithHTML(rubl).then()
});

composer.hears('val', ctx => {
    let job = new CronJob('* * * * * *', function () {
        ctx.telegram.sendMessage(admin, `${dollar}\n\n${yevro}\n\n${rubl}`).then();
    }, null, true);

    job.start();
})

bot.use(composer.middleware());


