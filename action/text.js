const { bot } = require("../core/bot");
const { isAdmin, getStep, saveMessage, validate, sendMessageAll } = require('../db/fuctions');
const { searchName } = require('../ism/search');

bot.on('text', async ctx => {
    if (await isAdmin()) {
        if (await getStep() === 0) {
            ctx.replyWithHTML('Ushbu habarni tasdiqlaysizmi? agar habarda kamchilik bolmasa "Tasdiqlash" tugmasini bosing. Aks holda "Orqaga" tugmasini bosing va habarni boshqattan yozing. Rahmat!')
            await saveMessage(ctx);
            await validate(ctx);
            ctx.replyWithHTML(ctx.message.text, {
                reply_markup: {
                    inline_keyboard: [
                        [
                        { text: 'Tasdiqlash', callback_data: 'tayyor' }
                        ],
                        [
                            { text: 'Orqaga', callback_data: 'sendmessage' }
                        ]
                    ]
                },
            });
            return
        }
    }
    
    await searchName(ctx)

});