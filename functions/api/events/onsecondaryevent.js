const functions = require('firebase-functions')

module.exports = exports = functions.firestore
    .document("secondary_data/{id}")
    .onCreate(async (snapshot, context) => {
        console.log("snapshot: ", snapshot.id)
    });