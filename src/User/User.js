const Request = require("request");
const Endpoints = require("../Endpoints");
const Webhook = require("./Webhook");
const Collection = require("../Collection");


class User {
    constructor(token) {
        this.token = token;
    }

    fetchWebhooks(channelID) {
        return new Promise((resolve, reject) => {
            Request({
                "method": "GET",
                "url": Endpoints.user_get(channelID),
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

    createWebhook(channelID, name, avatar) {
        return new Promise((resolve, reject) => {
            Request({
                "method": "POST",
                "url": Endpoints.user_create(channelID),
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
                return resolve(response, body);
            });
        });
    }
}

module.exports = User;
