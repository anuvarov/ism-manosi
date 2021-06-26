const token = process.env.TOKEN,
    db = process.env.DB,
    api = process.env.API,
    admin = process.env.ADMIN,
    nameChannel = process.env.ISMCHANNEL,
    confession = process.env.CONFESSION;

module.exports = {
    token,
    nameChannel,
    api,
    admin,
    db,
    confession,
};