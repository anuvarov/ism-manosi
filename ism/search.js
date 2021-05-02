const { bot } = require('../core/bot');
const data = require('../mygeodata_merged.json');
const { nameChannel } = require('../config')

function validateInput(text) {
  const validatedText = text.replace(/'/gi, `‘`).replace(/`/gi, `‘`).replace(/ʻ/gi, `‘`).replace(/ʼ/gi, `‘`);
  const validated = validatedText.charAt(0).toUpperCase() + validatedText.slice(1)
  return findName(validated)
}

function findName(name) {
  let result = data.find(item => {
    return item.properties.name === name;
  })
  if (result)
    return result.properties;
  return;
}


bot.on('text', ctx => {
  let text = ctx.message.text;

  if (text.length < 3) return ctx.replyWithHTML("Ism kamida 3 ta harfdan iborat bo'lishi kerak").then()
  if (text.includes(' ')) return ctx.replyWithHTML("Iltimos faqat ismni o'zini yozing. Agar ism 2 ta so'zdan tashkil topgan bo'lsa ularni alohida izlang yoki qo'shib yozing.").then()

  const result = validateInput(text)


  let gender = (result.gender == "M") ? `💁🏻‍♂️  O'g'il bolalar ismi` : `💁🏻  Qiz bolalar ismi`;
  
  ctx.telegram.sendMessage(
    nameChannel,
    `<b>👤  First name: </b> ${ctx.from.first_name}\n<b>👤  Last name: </b> ${ctx.from.first_name}\n🔗  Username: @${ctx.from.username}\n🆔  <code>${ctx.from.id}</code>\n\n📥  Input:  <b>${ctx.message.text}</b>\n\n📤  Result:  ${result.meaning || '<code> Error: name not found</code>'}`,
    {
      parse_mode: "HTML"
    }
  ).then()

  if (result == undefined) return ctx.replyWithHTML(`Siz so'ragan ism Topilmadi :(\nIsmni tog'ri kiritganingizni tekshirib ko'ring.\n\nAgar sizning ismingiz haqida ma'lumot chiqmasa iltimos bizga habar bering.\nMurojaat uchun: 👉🏻  @Anuvarov`).then()

  ctx.replyWithHTML(`<b>👤  ${result.name}</b>\n🌐 <b> Kelib chiqishi: ${result.origin}</b>\n${gender}\n\n<b>🗯 Ma'nosi: </b> ${result.meaning}`).then()
})