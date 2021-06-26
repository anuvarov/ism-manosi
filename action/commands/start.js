const { Composer } = require('telegraf');
const { bot } = require('../../core/bot');
const { User } = require('../../db/userSchema');

const composer = new Composer();

composer.command('start', async ctx => {
    const userId = ctx.from.id;
    const fullName = `${ctx.from.first_name} / ${ctx.from.last_name}`;
    const username = ctx.from.username;
    let user = await User.findOne({ userId: userId });
    console.log('user from database: -->', user);

    ctx.replyWithHTML(
        `Assalomu alaykum,  ${ctx.from.first_name},   Botimizga xush kelibsiz. \n\nBu bot orqali ismingizni ma'nosini bilib olishingiz mumkin.\nBoshlash uchun shunchaki ismingizni menga yozib yuboring...`
    ).then();
    
    if (user) {
        user.step += 1;
        await user.save();
        return
    };

    registrUser(userId, username, fullName, user);
});

async function registrUser(userId, username, fullName, user) {
    user = new User({
        userId,
        username,
        fullName,
    });
    user.step += 1;
    await user.save();;
}



bot.use(composer.middleware());
