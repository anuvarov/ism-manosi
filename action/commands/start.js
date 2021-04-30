const {Markup, Composer} = require('telegraf')
const { bot } = require('../../core/bot')

const composer = new Composer()

composer.command('start', ctx => {
    ctx.replyWithHTML(
        `Assalomu alaykum,  ${ctx.from.first_name},   Botimizga xush kelibsiz. \n\nBu bot orqali ismingizni ma'nosini bilib olishingiz mumkin.\nBoshlash uchun shunchaki ismingizni menga yozib yuboring...`
    ).then()
})

bot.use(composer.middleware())
