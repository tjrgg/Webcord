const EventEmitter = require("events").EventEmitter;
const Request = require("request");
const Endpoints = require("../Endpoints");

let regex = new RegExp(/https:\/\/discordapp\.com\/api\/(v6)?webhooks\/(.+)\/(.+)/gi);


class WebhookClient extends EventEmitter {
    constructor(webhookUrl) {
        super();

        let executed = regex.exec(webhookUrl);

        this.id = executed[2];
        this.token = executed[3];

        this.setup();
    }

    setup(data) {
        Request({
            "method": "GET",
            "url": Endpoints.client_get(this.id, this.token),
            "headers": {
                "Content-Type": "application/json"
            }
        }, (error, response, body) => {
            if (error) return this.emit("error", {error: error, response: response, body: body});
            let data = JSON.parse(body);
            if (data.code) return this.emit("bad_request", {response: response, body: body});
            this.name = data.name;
            this.guild = data.guild_id;
            this.channel = data.channel_id;
            this.creator = data.user ? {
                username: data.user.username,
                discriminator: data.user.discriminator,
                id: data.user.id,
                avatar: data.user.avatar
            } : null;
            this.emit("data", this);
        });
    }

    send(content) {
        return new Promise((resolve, reject) => {
            Request({
                "method": "POST",
                "url": Endpoints.post(this.id, this.token),
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

    delete() {
        return new Promise((resolve, reject) => {
            Request({
                "method": "DELETE",
                "url": Endpoints.delete(this.id, this.token),
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

module.exports = WebhookClient;
