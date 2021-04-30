const {Markup, Composer} = require('telegraf')
const { bot } = require('../../core/bot')

const composer = new Composer()

composer.help(ctx => {
    ctx.replyWithHTML(
        `Ishlatish mumkin bolgan datalar royxati \n/start - <code>botni ishga tushirish</code> \n/help - <code>shu sahifani korsatish</code> \n \n<i>menga xohlagan sms video rasm yuboring va man uni kanalga tashlayman</i>`
    ).then()
})



bot.use(composer.middleware())