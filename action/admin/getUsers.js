const { bot } = require('../../core/bot');
const { User } = require('../../db/userSchema');

bot.command('admin', async ctx => {
    const userId = ctx.from.id;
    let user = await User.findOne({ userId: userId });
    let users = await User
        .find()
        .sort({ step: -1 });

    if (user.isAdmin) {

        const text = users
            .map((el, i) => `N: ${i + 1}\nID: ${el.userId}\nFullName: ${el.fullName}\nusername: ${el.username}\nstep: ${el.step}\ndate: ${getDate(el.date)}\n`)
            .join('\n');

        return bot.telegram.sendMessage(userId, `siz adminsiz \n\n ${text}`);
    }
    bot.telegram.sendMessage(userId, 'siz admin emassiz');
});

function getDate(d) {
    const date = new Date(parseInt(d));

    const year = date.getFullYear();
    const month = (+date.getMonth() + 1) < 10 ? `0${(+date.getMonth() + 1)}` : (+date.getMonth() + 1);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${day}.${month}.${year} \t${hour}:${min}`
}