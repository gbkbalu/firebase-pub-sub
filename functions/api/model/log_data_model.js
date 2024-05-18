const database = require('../database');

// Here, we are implementing the class with Singleton design pattern
class LogDataModel {
    constructor() {
        if (this.instance) return this.instance;
        LogDataModel.instance = this;
        this.collection = "log_data";
    }

    batchinsertdata(documents) { return database.batchInsertion(this.collection, documents) }

    gettotalrecordscount(){return database.getTotalRecordCount(this.collection)}

}

module.exports = new LogDataModel();