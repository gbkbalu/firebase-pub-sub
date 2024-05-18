const database = require('../database');

// Here, we are implementing the class with Singleton design pattern
class ApiPubModel {
    constructor() {
        if (this.instance) return this.instance;
        ApiPubModel.instance = this;
        this.collection = "api_pub_data";
    }

    create(document) { return database.create(this.collection, document) }

    gettotalrecordscount() { return database.getTotalRecordCount(this.collection) }

}

module.exports = new ApiPubModel();