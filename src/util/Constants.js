const API = `https://discordapp.com/api`;

const Endpoints = exports.Endpoints = {
    create: channelID => `${API}/channels/${channelID}/webhooks`,
    get: channelID => `${API}/channels/${channelID}/webhooks`,

    post: (webhookID, webhookToken) => `${API}/webhooks/${webhookID}/${webhookToken}`
};
