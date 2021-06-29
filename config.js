const token = process.env.TOKEN,
    db = process.env.DB,
    api = process.env.API,
    adminId = process.env.ADMIN,
    channel = process.env.ISMCHANNEL,
    confession = process.env.CONFESSION,
    deepaiApiKey = process.env.DEEPAI_API_KEY;

module.exports = {
    token,
    channel,
    api,
    adminId,
    db,
    confession,
    deepaiApiKey,
};