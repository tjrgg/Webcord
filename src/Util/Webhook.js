const EventEmitter = require("events").EventEmitter;
const Request = require("request");
const Endpoints = require("./Endpoints");

class Webhook {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.token = data.token;
        this.guild = data.guild_id;
        this.channel = data.channel_id;
        this.creator = data.user ? {
            username: data.user.username,
            discriminator: data.user.discriminator,
            id: data.user.id,
            avatar: data.user.avatar
        } : null;
    }

    send(content) {
        return new Promise((resolve, reject) => {
            Request({
                "method": "POST",
                "url": Endpoints.webhook(this.id, this.token),
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({
                    "content": content
                })
            }, (error, response, body) => {
                if (error) return reject({error: error, response: response, body: body});
                return resolve({response: response, body: body});
            });
        });
    }

    slack(content = {}) {
        return new Promise((resolve, reject) => {
            Request({
                "method": "POST",
                "url": Endpoints.webhook_slack(this.id, this.token),
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(content)
            }, (error, response, body) => {
                if (error) return reject({error: error, response: response, body: body});
                return resolve({response: response, body: body});
            });
        });
    }

    manage(options = {}) {
        if (!options.name) options.name = this.name;
        return new Promise((resolve, reject) => {
            Request({
                "method": "PATCH",
                "url": Endpoints.webhook(this.id, this.token),
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(options)
            }, (error, response, body) => {
                if (error) return reject({error: error, response: response, body: body});
                return resolve({response: response, body: body});
            });
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            Request({
                "method": "DELETE",
                "url": Endpoints.webhook(this.id, this.token),
                "headers": {
                    "Content-Type": "application/json"
                }
            }, (error, response, body) => {
                if (error) return reject({error: error, response: response, body: body});
                return resolve({response: response, body: body});
            });
        });
    }
}

module.exports = Webhook;
