// This class is a wrapper for database connection. It centeralizes generic CRUD operations.
// Here, we are implementing the Database class with Singleton design pattern
//  Singleton is a design pattern where we create only a single instance (or object) from a class

// const respHandler = require('functions/api/handler/response.handler');

class Database {

    constructor() {

        if (this.instance) return this.instance  // This is the key idea of implementing singleton. Return the same instance (i.e. the one that has already been created before)

        // We only proceedd to the following lines only if no instance has been created from this class
        Database.instance = this

        const admin = require('firebase-admin')  // To access Firestore API

        // Since the functions and firestore run on the same server,
        //  we can simply use default credential.
        // However, if your app run different location, you need to create a JSON Firebase credentials

        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        })

        this.firestore = admin.firestore();
        this.firestore.settings({ ignoreUndefinedProperties: true })
        this.auth = admin.auth();
    }

    async create(collection, document) {
        try {
            document.createdAt = new Date();
            document.updatedAt = new Date();
            const docRef = this.firestore.collection(collection).doc(); // Auto-generated ID
            await docRef.set(document);
            return document
        } catch (error) {
            console.error('Error creating document: ', error);
        }
    }

    async get(collection, id) {
        const result = await this.firestore.collection(collection).doc(id).get()
        if (!result.exists) return null  // Record not found

        const doc = result.data()
        doc.id = result.id
        return doc
    }

    async batchInsertion(collection_name, documents) {
        let batch = this.firestore.batch();
        let collectionRef = this.firestore.collection(collection_name);
        documents.forEach((document) => {
            // const newDocRef = this.firestore.collection(collection_name).doc();
            batch.set(collectionRef.doc(), document);
            // document.id = newDocRef.id;
        });

        // Commit the batch
        batch.commit()
            .then(() => {
                console.log('Batch write succeeded.');
                return documents;
            })
            .catch(error => {
                console.error('Batch write failed: ', error);
            });
        // await batch.commit();
        // return documents;
    }

    async getTotalRecordCount(collection) {
        const snapshot = await this.firestore.collection(collection).count().get();
        return snapshot.data().count;
    }

    async set(collection, id, document) {
        document.updatedAt = new Date();
        const doc = this.firestore.collection(collection).doc(id)
        const result = await doc.get()

        if (!result.exists) return null  // Record not found

        await doc.set(document)

        document.id = id
        return document
    }

    async delete(collection, id) {
        const doc = this.firestore.collection(collection).doc(id)
        await doc.delete()
        return { id }
    }

    async updatedata(collection, id, subdoc) {
        const doc = this.firestore.collection(collection).doc(id).update(subdoc);
        return { id }
    }

    async createDoc(collection, id, document) {
        if (document === null || document === undefined) {
            document = {};
        }
        document.createdAt = new Date();
        document.updatedAt = new Date();
        document.status = this.config.status.Active
        document.id = id
        return await this.firestore.collection(collection).doc(id).set(document);
    }

    async userStats() {
        var userStats = await this.firestore.collection("stats").doc("user").get();
        if (!userStats.exists) {
            await this.firestore.collection("stats").doc("user").set({ counter: 0 });
        }
    }
}

module.exports = new Database()