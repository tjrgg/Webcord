const API = `https://discordapp.com/api`;

const Endpoints = module.exports = {
    user_create: channelID => `${API}/channels/${channelID}/webhooks`,
    user_get: channelID => `${API}/channels/${channelID}/webhooks`,

    client_get: (webhookID, webhookToken) => `${API}/webhooks/${webhookID}/${webhookToken}`,

    post: (webhookID, webhookToken) => `${API}/webhooks/${webhookID}/${webhookToken}`,
    delete: (webhookID, webhookToken) => `${API}/webhooks/${webhookID}/${webhookToken}`
};
