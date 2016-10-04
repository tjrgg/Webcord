const Request = require("request");
const Constants = require("./util/Constants");
const Webhook = require("./Webhook");

class Discord {
    constructor(token) {
        this.token = token;
    }

    createWebhook(channelID, name, avatar) {
        return new Promise((resolve, reject) => {
            Request({
                "method": "POST",
                "url": Constants.Endpoints.create(channelID),
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

    getWebhooks(channelID) {
        return new Promise((resolve, reject) => {
            Request({
                "method": "GET",
                "url": Constants.Endpoints.get(channelID),
                "headers": {
                    "Authorization": this.token,
                    "Content-Type": "application/json"
                }
            }, (error, response, body) => {
                if (error) return reject({error: error, response: response, body: body});
                let webhooks = JSON.parse(body);
                if (webhooks.code) return reject({response: response, body: body});
                return resolve(webhooks.map(webhook => new Webhook(webhook)));
            });
        });
    }
}


module.exports = Discord;
