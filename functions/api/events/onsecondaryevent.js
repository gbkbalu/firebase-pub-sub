const functions = require('firebase-functions')
const wealth_util = require('../util/wealth_util')
const config = require('../config')

module.exports = exports = functions.firestore
    .document("secondary_log_data/{id}")
    .onCreate(async (snapshot, context) => {
        console.log("secondary_log_data snapshot: ", snapshot.id)
        // Get the newly created document data
        let receivedMessage = snapshot.data();

        // Get the document ID if needed
        let docId = context.params.docId;

        // Log the document ID and data
        console.log(`secondary_log_data new document created with ID: ${docId}`);
        console.log('secondary_log_data document data:', receivedMessage);
        receivedMessage.secondary_log_received_at = new Date();
        receivedMessage.pubsub_time = new Date();
        wealth_util.publishMessageToTopic(config.SECONDARY_PUBSUB_TOPIC, receivedMessage);
    });
