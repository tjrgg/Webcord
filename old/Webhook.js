const Request = require("request");
const Constants = require("./util/Constants");

class Webhook {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.token = data.token;
        this.guild = data.guild_id;
        this.channel = data.channel_id;
        this.creator = {
            username: data.user.username,
            discriminator: data.user.discriminator,
            id: data.user.id,
            avatar: data.user.avatar
        };
    }

    send(content) {
        return new Promise((resolve, reject) => {
            Request({
                "method": "POST",
                "url": Constants.Endpoints.post(this.id, this.token),
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
}

module.exports = Webhook;
