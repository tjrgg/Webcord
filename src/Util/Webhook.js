const Request = require("request");
const Endpoints = require("./Endpoints");

/**
    * Represents the webhook.
    */
class Webhook {

    constructor(data) {
        /**
            * The name of the webhook.
            * @type {string}
            */
        this.name = data.name;

        /**
            * The ID of the webhook.
            @type {string}
            */
        this.id = data.id;

        /**
            * The token of the webhook.
            @type {string}
            */
        this.token = data.token;

        /**
            * The ID of the guild the webhook belongs to.
            @type {string}
            */
        this.guild = data.guild_id;

        /**
            * The ID of the channel the webhook belongs to.
            @type {string}
            */
        this.channel = data.channel_id;

        /**
            * The user that created the webhook.
            @type {User}
            */
        this.creator = data.user ? {
            username: data.user.username,
            discriminator: data.user.discriminator,
            id: data.user.id,
            avatar: data.user.avatar
        } : null;
    }

    /**
        * Sends a message via the webhook.
        * @param {string} content The content of the message to send.
        * @returns {Promise<object>}
        */
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

    /**
        * Sends a message via the webhook in a codeblock.
        * @param {string} content The content of the message to send.
        * @returns {Promise<object>}
        */
    sendCode(content) {
        return new Promise((resolve, reject) => {
            Request({
                "method": "POST",
                "url": Endpoints.webhook(this.id, this.token),
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({
                    "content": `\`\`\`${content}\`\`\``
                })
            }, (error, response, body) => {
                if (error) return reject({error: error, response: response, body: body});
                return resolve({response: response, body: body});
            });
        });
    }

    /**
        * Sends a message via the webhook using the Slack endpoint.
        * @param {object} content The content of the message to send.
        * @returns {Promise<object>}
        */
    sendSlack(content = {}) {
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

    /**
        * The options to change a webhook.
        * @property {string} name The new name to give the webhook.
        * @property {base64} avatar The new avatar to give the webhook.
        * @typedef {Object} ManageOptions
        */

    /**
        * Edit various properties of the webhook.
        * @param {ManageOptions} options The options to modify the webhook with.
        * @returns {Promise<object>}
        */
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

    /**
        * Delete the webhook.
        * @returns {Promise<object>}
        */
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
