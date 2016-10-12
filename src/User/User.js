const Collection = require("../Util/Collection");
const Endpoints = require("../Util/Endpoints");
const Request = require("request");
const Webhook = require("../Util/Webhook");

class User {
    constructor(token) {
        this.token = token;
    }

    /**
        * Create a webhook.
        * @param {string} channel ID of the channel for this webhook.
        * @param {string} name Name for the new webhook.
        * @param {base64} avatar base64 image for the webhook avatar.
        * @returns {Promise<Webhook>}
        */
    createWebhook(channel, name, avatar) {
        return new Promise((resolve, reject) => {
            Request({
                "method": "POST",
                "url": Endpoints.webhooks(channel),
                "headers": {
                    "Authorization": this.token,
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({
                    "name": name,
                    "avatar": avatar
                })
            }, (error, response, body) => {
                if (error) return reject({error: error, response: response, body: body});
                let webhook = JSON.parse(body);
                if (webhook.code) return reject({response: response, body: body});
                return resolve(new Webhook(webhook));
            });
        });
    }

    /**
        * Fetch webhooks.
        * @param {string} channelID The channel ID to fetch webhooks from.
        * @returns {Promise<Webhook>}
        */
    fetchWebhooks(channelID) {
        return new Promise((resolve, reject) => {
            Request({
                "method": "GET",
                "url": Endpoints.webhooks(channelID),
                "headers": {
                    "Authorization": this.token,
                    "Content-Type": "application/json"
                }
            }, (error, response, body) => {
                if (error) return reject({error: error, response: response, body: body});
                let webhooks = JSON.parse(body);
                if (webhooks.code) return reject({response: response, body: body});
                if (!webhooks) return resolve([]);
                let Webhooks = new Collection();
                webhooks.map(webhook => {
                    let hook = new Webhook(webhook);
                    Webhooks.set(hook.id, hook);
                });
                return resolve(Webhooks);
            });
        });
    }


}

module.exports = User;
