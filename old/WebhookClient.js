const EventEmitter = require("events").EventEmitter;

class WebhookClient extends EventEmitter {
    constructor(webhookUrl) {
        super();
        
        let Regex = new RegExp(/https:\/\/discordapp\.com\/api\/(v6)?webhooks\/(.+)\/(.+)/gi);
        let match = Regex.exec(webhookUrl);
        console.log(JSON.stringify(match, null, 4));
        this.id = match[2];
        this.token = match[3];
    }

    setup(data) {

    }
}

module.exports = WebhookClient;
