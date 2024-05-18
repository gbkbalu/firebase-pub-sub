const functions = require('firebase-functions')
const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub();
const config = require('../config')

module.exports = exports = functions.pubsub.topic(config.TOPIC_NAME)
    .onPublish(async (message) => {
        console.log("message recived from pubsub****************", new Date())
        const result = message.data ? Buffer
            .from(message.data, "base64").toString() : "Failed to convert";
        const mailJson = JSON.parse(result);
        console.log(mailJson)
    });