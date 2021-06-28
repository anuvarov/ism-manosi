const { bot } = require('../../core/bot');
const { validate } = require('../../db/fuctions');

bot.command('start', async ctx => {
    ctx.replyWithHTML(
        `Assalomu alaykum,  ${ctx.from.first_name},   Botimizga xush kelibsiz. \n\nBu bot orqali ismingizni ma'nosini bilib olishingiz mumkin.\nBoshlash uchun shunchaki ismingizni menga yozib yuboring...`
    ).then();

    await validate(ctx);
});
