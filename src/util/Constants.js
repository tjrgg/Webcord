const API = `https://discordapp.com/api`;

const Endpoints = exports.Endpoints = {
    create: channelID => `${API}/channels/${channelID}/webhooks`
};
