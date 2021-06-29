const { bot } = require('../core/bot');
const { validate, isAdmin, getUsers, step0, getSubsc, sendMessageAll } = require('../db/fuctions');
const { Markup } = require('telegraf');

const keyboard = Markup.inlineKeyboard([
    Markup.callbackButton('Get all users', 'getallusers'),
    Markup.callbackButton('info', 'subsc'),
    Markup.callbackButton('Send Message', 'sendmessage')
])

bot.command('admin', async ctx => {
    if (await isAdmin())
        return ctx.replyWithHTML(`Please enter the button to get information`, {
            reply_markup: keyboard
        });

    ctx.replyWithHTML('Siz admin emassiz');
});

bot.action('getallusers', async ctx => {
    ctx.deleteMessage();
    await getUsers()
        .then(result => ctx.replyWithHTML(result))
        .catch(err => {
            if (err)
                throw err;
        });
});

bot.action('subsc', async ctx => {
    try {
        ctx.deleteMessage();
        await getSubsc().then(data=>ctx.replyWithHTML(data))
    } catch (err) {
        if (err)
            throw err
    }
});

bot.action('sendmessage', async ctx => {
    try {
        await step0();
        ctx.deleteMessage();
        ctx.replyWithHTML('Please write message that you want to send all users. (message text must sent only once!)');

    } catch (err) {
        if (err)
            throw err
    }
});

bot.action('tayyor', async () => {
    await sendMessageAll();
})

// (async function () {
//     let usr = await User.find();

//     let lus = usr.map(el => el.userId);
//     console.log(lus)

//     lus.forEach(user => {
//         bot.telegram.sendMessage(user, 'bu habar hammaga jonatiladi')
//             .then(() => console.log('successfully'))
//             .catch(async err => {
//                 if (err.code === 403) {
//                     await User.updateMany({ userId: err.on.payload.chat_id }, {
//                         $set: {
//                             isActive: false
//                         }
//                     });
//                 }
//             });
//     });
// })()

// bot.on('message', ctx => {
//     validate(ctx)
//     bot.telegram.sendMessage(ctx.from.id, 'Active')
// })