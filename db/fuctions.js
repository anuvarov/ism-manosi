const { User } = require('./userSchema');

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
    if (user.userId === 920035680)
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

exports.isAdmin = async ctx => {
    console.log('isAdmin function')
    const userId = ctx.from.id;
    const user = await User.findOne({ userId: userId });
    if (userId === user.userId)
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