const { bot } = require('../core/bot');
const { User } = require('./userSchema');
const { adminId } = require('../config');

exports.validate = async ctx => {
    console.log('validate function')
    const userId = ctx.from.id;
    const username = ctx.from.username;
    const fullName = `${ctx.from.first_name} / ${ctx.from.last_name}`;

    let user = await User.findOne({ userId: userId });
    if (user)
        return updateStep(user);
    user = new User({
        userId,
        username,
        fullName,
    });
    if (user.userId === adminId)
        user.isAdmin = true;
    await user.save();
};

const updateStep = async user => {
    console.log('update function')
    user.step += 1;
    user.isActive = true;
    await user.save();
    return;
}
exports.updateStep = updateStep;

exports.step0 = async () => {
    await User.findOneAndUpdate({ userId: adminId }, {
        $set: {
            step: 0
        }
    }).then().catch(err => {
        if (err)
            throw err;
    });
}

exports.getStep = async () => {
    let step = await User.findOne({ userId: adminId });

    step = step.step;
    return step;
}

exports.isAdmin = async () => {
    console.log('isAdmin function')
    const user = await User.find({ userId: adminId });
    if (user)
        return true;
    return false;
}

exports.getUsers = async () => {
    const users = await User
        .find()
        .sort({ step: -1 });

    return users
        .map((el, i) => `N: ${i + 1}\nID: <code>${el.userId}</code>\nFullName: ${el.fullName}\nusername: ${el.username}\nstep: ${el.step}\ndate: ${formatData(el.date)}\n`)
        .join('\n');
}

function formatData(d) {
    const date = new Date(parseInt(d));

    const year = date.getFullYear();
    const month = (+date.getMonth() + 1) < 10 ? `0${(+date.getMonth() + 1)}` : (+date.getMonth() + 1);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${day}.${month}.${year} \t${hour}:${min}`
}

exports.getSubsc = async () => {
    const users = await User
        .find()
        .sort({ date: -1 });
    const activeUsers = await User
        .find({ isActive: true });

return `Active Users: -->${activeUsers}`
}

exports.sendMessageAll = async () => {
    const users = await User.find({ isActive: true });
    const admin = await User.findOne({ userId: adminId });
    const usersId = users.map(user => user.userId);
console.log(admin)
    usersId.forEach(userId => {
        bot.telegram.sendMessage(userId, admin.message, {
            parse_mode: 'HTML'
        })
            .then(mes => bot.telegram.sendMessage(adminId, `Success\n\nMessage: --> ${mes}\n\nuserId; --> ${userId}`))
            .catch(async err => {
                if (err.code === 403) {
                    await User.findOneAndUpdate({ userId: userId }, {
                        $set: {
                            isActive: false
                        }
                    })
                }
            });
    });
}

exports.saveMessage = async ctx => {
    const text = ctx.message.text;
    await User.findOneAndUpdate({ userId: adminId }, {
        $set: {
            message: text
        }
    }).then().catch(err => console.log(err));
}
