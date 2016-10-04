const Request = require("request");
const Constants = require("./util/Constants");

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
                "body": {
                    "name": name,
                    "avatar": avatar
                }
            }, (error, response, body) => {
                if (error) return reject(error, response, body);
                return resolve(response, body);
            });
        });
    }
}


module.exports = Discord;
