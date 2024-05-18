const functions = require('firebase-functions')
const secondaryLogDataModel = require('../model/secondary_log_data_model')

module.exports = exports = functions.firestore
  .document("log_data/{docId}")
  .onCreate(async (snapshot, context) => {
    console.log("log_data snapshot: ", snapshot.id)
    // Get the newly created document data
    let newDoc = snapshot.data();

    // Get the document ID if needed
    let docId = context.params.docId;

    // Log the document ID and data
    console.log(`Log_data new document created with ID: ${docId}`);
    console.log('Log_dat document data:', newDoc);
    newDoc.log_event_received_at = new Date();
    await secondaryLogDataModel.create(newDoc);
  });