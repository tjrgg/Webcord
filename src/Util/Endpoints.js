const baseUrl = `https://discordapp.com/api`;

const Endpoints = module.exports = {
    webhooks: channel => `${baseUrl}/channels/${channel}/webhooks`,
    webhook: (id, token) => `${baseUrl}/webhooks/${id}/${token}`,
    webhook_slack: (id, token) => `${baseUrl}/webhooks/${id}/${token}/slack`
};
