class Styles  {

    /**
        * Bold text.
        * @param {string} text The text to bold.
        * @returns {string}
        */
    b(text) {
        let mrkdwn = '**';
        return mrkdwn.concat(text, mrkdwn);
    }

    /**
        * Put text in codeblock.
        * @param {string} text The text to put in a codeblock.
        * @param {string} lang The language to send the codeblock in.
        * @returns {string}
        */
    code(text, lang) {
        let mrkdwn = '```';
        return `${mrkdwn}${lang}\n${text}${mrkdwn}`;
    }

    /**
        * Italize text.
        * @param {string} text The text to italize.
        * @returns {string}
        */
    i(text) {
        let mrkdwn = '*';
        return mrkdwn.concat(text, mrkdwn);
    }

    /**
        * Strikethrough text.
        * @param {string} text The text to strikethrough.
        * @returns {string}
        */
    s(text) {
        let mrkdwn = '~~';
        return mrkdwn.concat(text, mrkdwn);
    }

    /**
        * Underline text.
        * @param {string} text The text to underline.
        * @returns {string}
        */
    u(text) {
        let mrkdwn = '__';
        return mrkdwn.concat(text, mrkdwn);
    }

}

module.exports = Styles;
