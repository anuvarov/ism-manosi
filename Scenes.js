const { BaseScene } = require("telegraf");

class SceneGenerator {
    GenNameScene() {
        const name = new BaseScene('name');
        name.enter(ctx => ctx.replyWithHTML('Ismingizni kiriting.'));
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
        return name;
    }

    GenAgeScene() {
        const age = new BaseScene('age');
        age.enter(ctx => ctx.replyWithHTML('Yoshingizni kiriting.'));
        age.on('text', ctx => {
            const age = Number(ctx.message.text);
            if (age && age > 120) {
                ctx.replyWithHTML('Shu yoshda ekanligingizga ishonmiman iltimos o\'zingizni yoshingizni yozing. Rahmat.');
                return ctx.scene.reenter();
            }
            else if (age > 0)
                return ctx.scene.enter('city', { age: age, name: ctx.scene.state.name });
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
        return age
    }

    GenCityScene() {
        const city = new BaseScene('city');
        city.enter(ctx => ctx.replyWithHTML('Manzilingizni kiriting. (Viloyat yoki shahar)'));
        city.on('text', async ctx => {
            const city = ctx.message.text;
            if (city) {
                ctx.session.name = ctx.scene.state.name;
                ctx.session.age = ctx.scene.state.age;
                ctx.session.city = city;
                await ctx.replyWithHTML(`Quyidagi Ma'lumotlar to'g'ri kiritilganini tasdiqlaysizmi? Agar to'g'ri bo'lsa "Tasdiqlash" tugmasini bosing, xato bo'lsa "Orqaga" tugmasini bosing.\n\nIsm: ${ctx.scene.state.name}\nYosh: ${ctx.scene.state.age}\nManzil: ${city}`, { reply_markup: { inline_keyboard: [[{ text: "Tasdiqlash", callback_data: "tasdiqlash" }, { text: "Orqaga", callback_data: "orqaga" }]] } })
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
        return city;
    }
}

module.exports = SceneGenerator;