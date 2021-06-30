const { Stage, session } = require('telegraf');
const { bot } = require('../../core/bot');
const { validate } = require('../../db/fuctions');
const SceneGenerator = require('../../Scenes');
const newScene = new SceneGenerator();
const nameScene = newScene.GenNameScene();
const ageScene = newScene.GenAgeScene();
const cityScene = newScene.GenCityScene();

const stage = new Stage([nameScene, ageScene, cityScene]);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', async ctx => {
    await ctx.replyWithHTML(
        `Assalomu alaykum,  ${ctx.from.first_name},  Botimizga xush kelibsiz. \n\nBu bot orqali ismingizni ma'nosini bilib olishingiz mumkin.\nBotdan foydalanish uchun ro\'yxatdan o\'ting.`).then();
    await ctx.scene.enter('name');
    await validate(ctx);
});

bot.action('tasdiqlash', ctx => {
    ctx.deleteMessage();
    ctx.replyWithHTML('Ro\'yxatdan o\'tganingiz uchun rahmat. Endi menga ismlarni jo\'natib ma\'nosini bilib olishingiz mumkin')
    console.log(ctx.session?.name)
    console.log(ctx.session?.age)
    console.log(ctx.session?.city)
})

bot.action('orqaga', ctx => {
    ctx.scene.enter('name');
})