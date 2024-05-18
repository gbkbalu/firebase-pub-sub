const functions = require('firebase-functions')
const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub();
const config = require('../config')
const secondary_pub_model = require('../model/sec_pub_data_model')

module.exports = exports = functions.pubsub.topic(config.SECONDARY_PUBSUB_TOPIC)
    .onPublish(async (message) => {
        console.log("message recived from sec_pub_data_model****************", new Date())
        const result = message.data ? Buffer
            .from(message.data, "base64").toString() : "Failed to convert";
        const receivedData = JSON.parse(result);
        console.log('sec_pub_data_model:', receivedData)
        receivedData.sec_pub_received_at = new Date();
        await secondary_pub_model.create(receivedData);
    });