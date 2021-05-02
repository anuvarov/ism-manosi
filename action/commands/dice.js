const { bot } = require('../../core/bot')

bot.on('dice', ctx =>  ctx.replyWithDice().then())