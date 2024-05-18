const functions = require('firebase-functions')
const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub();
const config = require('../config')
const api_pub_model = require('../model/api_pub_data_model')

module.exports = exports = functions.pubsub.topic(config.TOPIC_NAME)
    .onPublish(async (message) => {
        console.log("message recived from api_pub_data_model****************", new Date())
        const result = message.data ? Buffer
            .from(message.data, "base64").toString() : "Failed to convert";
        let receivedData = JSON.parse(result);
        console.log("api_pub_data_model:", receivedData);
        receivedData.api_received_at = new Date();
        await api_pub_model.create(receivedData);
    });