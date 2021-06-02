const { bot } = require('../../core/bot');

bot.on('dice', ctx => {
    setTimeout(() => {
        if (ctx.message.dice.emoji === "⚽")
            ctx.telegram.sendDice(ctx.from.id, {
                emoji: "⚽"
            });

        if (ctx.message.dice.emoji === "🏀")
            ctx.telegram.sendDice(ctx.from.id, {
                emoji: "🏀"
            });

        if (ctx.message.dice.emoji === "🎳")
            ctx.telegram.sendDice(ctx.from.id, {
                emoji: "🎳"
            });

        if (ctx.message.dice.emoji === "🎰")
            ctx.telegram.sendDice(ctx.from.id, {
                emoji: "🎰"
            });
        if (ctx.message.dice.emoji === "🎲")
            ctx.telegram.sendDice(ctx.from.id, {
                emoji: "🎲"
            });
        if (ctx.message.dice.emoji === "🎯")
            ctx.telegram.sendDice(ctx.from.id, {
                emoji: "🎯"
            });
    }, 1000);
});