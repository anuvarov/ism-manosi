const { bot } = require("../../core/bot");
const { validate, isAdmin, getUsers } = require('../../db/fuctions');

bot.on('callback_query', ctx => {
    const cbq = ctx.update.callback_query.data;
    ctx.replyWithHTML('cbQuery');
})