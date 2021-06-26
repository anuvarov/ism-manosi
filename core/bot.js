const { Telegraf } = require('telegraf');
const { token } = require('../config');

const bot = new Telegraf(token);

bot.launch().then();

module.exports = { bot };