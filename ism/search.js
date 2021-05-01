const { bot } = require('../core/bot');
const data = require('../mygeodata_merged.json');
const { nameChannel } = require('../config')


function findName(name) {
  let result = data.find(item => {
    return item.properties.name === name;
  })
  if (result !== undefined)
    return result.properties;
  return "Ism topilmadi"
}


bot.on('text', ctx => {
  const input = ctx.message.text.charAt(0).toUpperCase() + ctx.message.text.slice(1)
  const input2 = input.replace(/'/g, `‘`).replace(/`/g, `‘`).replace(/ʻ/g, `‘`).replace(/ʼ/g, `‘`);
  let ism = findName(input2).name;
  let mano = findName(input2).meaning;
  let til = findName(input2).origin;
  let jins = (findName(input2).gender == "M")? `💁🏻‍♂️  O'g'il bolalar ismi`: `💁🏻  Qiz bolalar ismi`
  
  ctx.telegram.sendMessage(
    nameChannel,
    `<b>👤  First name: </b> ${ctx.from.first_name}\n<b>👤  Last name: </b> ${ctx.from.first_name}\n🔗  Username: @${ctx.from.username}\n🆔  <code>${ctx.from.id}</code>\n\n📥  Input:  <b>${ctx.message.text}</b>\n\n📤  Result:  ${mano || '<code> Error: name not found</code>'}`,
    {
      parse_mode: "HTML"
    }
  ).then()

  if (ism == undefined) return ctx.replyWithHTML(`Siz so'ragan ism Topilmadi :(\nIsmni tog'ri kiritganingizni tekshirib ko'ring.\n\nAgar sizning ismingiz haqida ma'lumot chiqmasa iltimos bizga habar bering.\nMurojaat uchun: 👉🏻  @Anuvarov`).then()

  ctx.replyWithHTML(`<b>👤  ${ism}</b>\n🌐 <b> Kelib chiqishi: ${til}</b>\n${jins}\n\n<b>🗯 Ma'nosi: </b> ${mano}`).then()
})