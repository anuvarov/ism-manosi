const { channel } = require('../config');
const { validate } = require('../db/fuctions');
const { validInp, channelPost } = require('./functions');

exports.searchName = async (ctx) => {
  await validate(ctx).then().catch(err => {
    if (err)
      throw err;
  });

  ctx.replyWithHTML(validInp(ctx))
    .then()
    .catch(err => console.log(err));

  ctx.telegram.sendMessage(channel, channelPost(ctx), {
    parse_mode: 'HTML'
  })
    .then()
    .catch(err => console.log(err));
}