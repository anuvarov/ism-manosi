const { Markup, session, BaseScene, Stage } = require('telegraf');
const { bot } = require('../core/bot');


const exit_keyboard = Markup.keyboard(['exit']).oneTime();
const remove_keyboard = Markup.removeKeyboard();

const name = new BaseScene('name');
name.enter(ctx => ctx.replyWithHTML('Ismingizni kiriting.', exit_keyboard));
name.on('text', ctx => {
    const name = ctx.message.text;
    if (name)
        return ctx.scene.enter('age', { name: name });
    else {
        ctx.replyWithHTML('Iltimos, ismingizni kiriting.');
        ctx.scene.reenter();
    }
});
name.on('message', ctx => {
    ctx.replyWithHTML('Iltimos, ismingizni matn shaklida yozing, boshqa narsalar jo\'natmang. Rahmat.');
    ctx.scene.reenter();
});
name.leave();

const age = new BaseScene('age');
age.enter(ctx => ctx.replyWithHTML('Yoshingizni kiriting.', exit_keyboard));
age.on('text', ctx => {
    const age = Number(ctx.message.text);
    if (age && age>0)
        return ctx.scene.enter('city', { age: age, name: ctx.scene.state.name });
    else if (age < 120)
        ctx.replyWithHTML('Shu yoshda ekanligingizga ishonmiman iltimos o\'zingizni yoshingizni yozing. Rahmat.')
    else {
        ctx.replyWithHTML('Iltimos, yoshingizni kiriting.');
        ctx.scene.reenter();
    }
});
age.on('message', ctx => {
    ctx.replyWithHTML('Iltimos, yoshingizni son shaklida yozing, boshqa narsalar jo\'natmang. Rahmat.');
    ctx.scene.reenter();
});
age.leave();

const city = new BaseScene('city');
city.enter(ctx => ctx.replyWithHTML('Manzilingizni kiriting. (Viloyat yoki shahar)', exit_keyboard));
city.on('text', async ctx => {
    const city = ctx.message.text;
    if (city) {
        ctx.session.name = ctx.scene.state.name;
        ctx.session.age = ctx.scene.state.age;
        ctx.session.city = city;
        await ctx.replyWithHTML(`Quyidagi Ma'lumotlar to'g'ri kiritilganini tasdiqlaysizmi? Agar to'g'ri bo'lsa "Tasdiqlash" tugmasini bosing, xato bo'lsa "Orqaga" tugmasini bosing.`);
        await ctx.replyWithHTML(`Ism: ${ctx.scene.state.name}\nYosh: ${ctx.scene.state.age}\nManzil: ${city}`, { reply_markup: { inline_keyboard: [[{ text: "Tasdiqlash", callback_data: "tasdiqlash" }, { text: "Orqaga", callback_data: "orqaga" }]] } })
        ctx.scene.leave();
    }
    else {
        ctx.replyWithHTML('Iltimos, manzilingizni kiriting.');
        ctx.scene.reenter();
    }
});
city.on('message', ctx => {
    ctx.replyWithHTML('Iltimos, manzilingizni matn shaklida yozing, boshqa narsalar jo\'natmang. Rahmat.');
    ctx.scene.reenter();
});
city.leave();

const stage = new Stage([name, age, city]);

stage.hears('exit', ctx => ctx.scene.leave());

bot.use(session());
bot.use(stage.middleware());
// bot.command('info', ctx => ctx.scene.enter('newScene'));
bot.command('tay', ctx => {
    console.log(ctx.session?.name, ctx.session?.age, ctx.session?.city)
});
bot.start(ctx => {
    ctx.replyWithHTML('Botimizga xush kelibsiz');
    ctx.scene.enter('name')
});
// bot.start(ctx => {
//     ctx.replyWithHTML('<b>Hello</b>', {
//         reply_markup: Markup.removeKeyboard()
//     }).then().catch(err => console.log(err))
// });