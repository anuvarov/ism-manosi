const data = require('../mygeodata_merged.json');

exports.validInp = ctx => {
    const text = ctx.message.text;

    if (text.length < 3)
        return "Ism kamida 3 ta harfdan iborat bo'lishi kerak"
    if (text.length > 21)
        return "Ism bunchalik uzun bo'lishi mumkin emas."
    if (text.includes(' '))
        return "Iltimos faqat ismni o'zini yozing. Agar ism 2 ta so'zdan tashkil topgan bo'lsa ularni alohida izlang yoki qo'shib yozing."

    let validatedText = text
        .replace(/'/gi, `‘`)
        .replace(/`/gi, `‘`)
        .replace(/ʻ/gi, `‘`)
        .replace(/ʼ/gi, `‘`);

    validatedText = validatedText.charAt(0).toUpperCase() + validatedText.slice(1);

    return findName(validatedText);
}

function findName(name) {
    let result = data.find(item => item.properties.name === name)

    if (result)
        return sortName(result.properties);
    return `Siz so'ragan ism Topilmadi :(\nIsmni tog'ri kiritganingizni tekshirib ko'ring.\n\nAgar sizning ismingiz haqida ma'lumot chiqmasa iltimos bizga habar bering.\nMurojaat uchun: 👉🏻  @Anuvarov`;
}

function sortName(name) {
    let gender = (name.gender == "M") ? `💁🏻‍♂️  O'g'il bolalar ismi` : `💁🏻  Qiz bolalar ismi`;

    return `<b>👤  ${name.name}</b>\n🌐 <b> Kelib chiqishi: ${name.origin}</b>\n${gender}\n\n<b>🗯 Ma'nosi: </b> ${name.meaning}`;
}


exports.channelPost = ctx => {
    const userId = ctx.from.id;
    const firstName = ctx.from.first_name;
    const lastName = ctx.from.last_name;
    const username = ctx.from.username;
    const text = ctx.message.text;

    return `<b>👤  First name: </b> ${firstName}\n<b>👤  Last name: </b> ${lastName}\n🔗  Username: @${username}\n🆔  <code>${userId}</code>\n\n📥  Input:  <b>${text}</b>`;
}