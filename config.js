const token = process.env.TOKEN,
    db = process.env.DB,
    api = process.env.API,
    admin = process.env.ADMIN,
    nameChannel = process.env.ISMCHANNEL,
    confession = process.env.CONFESSION,
    deepaiApiKey = process.env.DEEPAI_API_KEY;

module.exports = {
    token,
    nameChannel,
    api,
    admin,
    db,
    confession,
    deepaiApiKey,
};