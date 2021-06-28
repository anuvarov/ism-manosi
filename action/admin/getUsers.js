const { bot } = require('../../core/bot');
const { User } = require('../../db/userSchema');
const { validate, isAdmin, getUsers } = require('../../db/fuctions');
const { Markup } = require('telegraf');

bot.command('admin', async ctx => {
    if (isAdmin(ctx))
        return ctx.replyWithHTML(`Please enter the button to get information`, {
            reply_markup: Markup.inlineKeyboard([
                Markup.callbackButton('Get all users', 'getallusers')
            ])
        });

    ctx.replyWithHTML('Siz admin emassiz');
});

bot.action('getallusers', ctx => {
    ctx.deleteMessage();
    getUsers()
        .then(result => ctx.replyWithHTML(result))
        .catch(err => console.log(err));
});

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