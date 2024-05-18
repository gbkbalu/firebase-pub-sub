const functions = require('firebase-functions')
const secondaryLogDataModel = require('../model/secondary_log_data_model')

module.exports = exports = functions.firestore
  .document("log_data/{docId}")
  .onCreate(async (snapshot, context) => {
    console.log("snapshot: ", snapshot.id)
    // Get the newly created document data
    let newDoc = snapshot.data();

    // Get the document ID if needed
    let docId = context.params.docId;

    // Log the document ID and data
    console.log(`New document created with ID: ${docId}`);
    console.log('Document data:', newDoc);
    newDoc.received_time = new Date();
    newDoc.created_at = new Date();
    await secondaryLogDataModel.create(newDoc);
  });