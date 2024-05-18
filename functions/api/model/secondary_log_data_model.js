const database = require('../database');

// Here, we are implementing the class with Singleton design pattern
class SecondaryLogDataModel {
    constructor() {
        if (this.instance) return this.instance;
        SecondaryLogDataModel.instance = this;
        this.collection = "secondary_log_data";
    }
    create(document) { return database.create(this.collection, document) }
    gettotalrecordscount() { return database.getTotalRecordCount(this.collection) }
}

module.exports = new SecondaryLogDataModel();