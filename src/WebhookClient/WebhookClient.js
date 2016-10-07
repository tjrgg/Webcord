const Request = require("request");
const Endpoints = require("../Util/Endpoints");
const Webhook = require("../Util/Webhook");

/** Starting point for connecting to a webhook. */
class WebhookClient {

    /**
        * Connects the client to the webhook.
        * @param {string} idOrUrl The ID of the webhook or the webhook URL.
        * @param {string} token The token for the webhook. Only needed if an ID was provided instead of a URL.
        * @returns {Promise<string>}
        * @example
        * // connect using webhook url
        * const hook = "";
        * WebhookClient.connect(hook).then(webhook => {
        *   // do stuff
        * });
        * @example
        * // connect using id and token
        * const id = "";
        * const token = "";
        * WebhookClient.connect(id, token).then(webhook => {
        *   // do stuff
        * });
        */
    connect(idOrUrl, token) {
        return new Promise((resolve, reject) => {
            let c_id, c_token;
            if (!token) {
                let match = new RegExp(/https:\/\/discordapp\.com\/api\/(v6)?webhooks\/(.+)\/(.+)/gi).exec(idOrUrl);
                c_id = match[2];
                c_token = match[3];
            } else {
                c_id = idOrUrl;
                c_token = token;
            }
            Request({
                "method": "GET",
                "url": Endpoints.webhook(c_id, c_token),
                "headers": {
                    "Content-Type": "application/json"
                }
            }, (error, response, body) => {
                if (error) throw new Error("Failed to communicate to Discord API.");
                if (response.statusCode !== 200) throw new Error(`Status Code ${response.statusCode}\n${body}`);
                let data = JSON.parse(body);
                if (data.code) throw new Error(`Received bad request. Code: ${data.code} ; Message ${data.message}`);
                let webhook = new Webhook(data);
                return resolve(webhook);
            });
        });
    }
}

module.exports = WebhookClient;
