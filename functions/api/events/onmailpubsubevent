const functions = require('firebase-functions')
const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub();

module.exports = exports = functions.pubsub.topic("email-event")
    .onPublish(async (message) => {
        console.log("message recived****************", new Date())
        const result = message.data ? Buffer
            .from(message.data, "base64").toString() : "Failed to convert";
        const mailJson = JSON.parse(result);
        var mailData = { name: mailJson.name, otp: mailJson.otp };
        console.log(mailData)
    });