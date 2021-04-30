const { bot } = require('../core/bot');
const data = require('../mygeodata_merged.json');
// const {Composer} = require('telegraf')
const { ismchannel, admin } = require('../config')

// const composer = new Composer()


function ismTop(ism) {
  let natija = data.find(item => {
    return item.properties.name === ism;
  })
  if (natija !== undefined)
    return natija.properties;
  return "Ism topilmadi"
}

console.log(ismTop('iy'))


bot.on('text', ctx => {

  ctx.telegram.sendMessage(
    ismchannel,
    `<b>First name: </b> ${ctx.from.first_name}\n<b>Last name: </b> ${ctx.from.first_name}\nUsername: @${ctx.from.username}\nID: ${ctx.from.id}`,
    {
      parse_mode: "HTML"
    }
  ).then()

  let input = ctx.message.text.charAt(0).toUpperCase() + ctx.message.text.slice(1)

  let ism = ismTop(input).name;
  let mano = ismTop(input).meaning;
  if (ism == undefined || mano == undefined) return ctx.replyWithHTML(`Siz so'ragan ism Topilmadi :(\nIsmni tog'ri kiritganingizni tekshirib ko'ring.\n\nAgar sizning ismingiz haqida ma'lumot chiqmasa iltimos bizga habar bering.\nMurojaat uchun: 👉🏻  @Anuvarov`).then()

  ctx.replyWithHTML(`<b>Ism:</b> ${ism} \n<b>Ma'nosi: </b> ${mano}`).then()

  console.log(ctx.message.text)



})


// composer.on('text', ctx => {
//   console.log(ctx.message.text)

//   ctx.telegram.sendMessage(admin, `First name: ${ctx.from.first_name}\nID ${ctx.from.id}\n ${ctx.from.username}`).then()
//   // ctx.telegram.sendVideo(confession, ctx.message.video.file_id).then()
// })


// bot.use(composer.middleware())