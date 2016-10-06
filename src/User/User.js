const Request = require("request");
const Endpoints = require("../Util/Endpoints");
const Webhook = require("../Util/Webhook");
const Collection = require("../Util/Collection");

class User {
    constructor(token) {
        this.token = token;
    }

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
                let Webhooks = new Collection();
                webhooks.map(webhook => {
                    let hook = new Webhook(webhook);
                    Webhooks.set(hook.id, hook);
                });
                return resolve(Webhooks);
            });
        });
    }

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
}

module.exports = User;
