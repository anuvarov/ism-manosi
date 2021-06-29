const { bot } = require('../../core/bot');
const deepai = require('deepai');
const { deepaiApiKey } = require('../../config');
const { User } = require('../../db/userSchema');
const { validate } = require('../../db/fuctions');

// deepai.setApiKey(deepaiApiKey);

// const newPhoto = async ctx => {
//     const fileId = ctx.message.photo[2].file_id;
//     const getfile = bot.telegram.getFile(fileId);


//     getfile.then(async res => {
//         const userId = ctx.from.id;
//         const messageId = ctx.message.message_id;
//         const filePath = res.file_path;
//         const fileUrl = `http://api.telegram.org/file/bot${process.env.TOKEN}/${filePath}`;

//         let resp = await deepai.callStandardApi("toonify", {
//             image: fileUrl,
//         });

//         ctx.replyWithPhoto(resp.output_url).catch(err => console.log('30', err));

//         let user = await User.findOneAndUpdate(
//             { userId: userId },
//             {
//                 $push: {
//                     photosId: {
//                         $each: [
//                             { messageId: messageId, newFileId: (+messageId) + 1 },
//                         ]
//                     }
//                 }
//             });

//         const usr = await user.save();

//         registrUser(ctx, user);


//         console.log(usr)
//     })
// };



// async function registrUser(ctx, user) {
//     const userId = ctx.from.id;
//     const fullName = `${ctx.from.first_name} / ${ctx.from.last_name}`;
//     const username = ctx.from.username;
//     user = new User({
//         userId,
//         username,
//         fullName,
//     });
//     user.step += 1;
//     await user.save();;
// }



bot.on('photo', async ctx => {
    await validate(ctx);
    // await newPhoto(ctx);
    console.log('photo')
});

