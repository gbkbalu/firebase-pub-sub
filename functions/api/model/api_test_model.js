const database = require('../database');

// Here, we are implementing the class with Singleton design pattern
class LogDataModel {
    constructor() {
        if (this.instance) return this.instance;
        LogDataModel.instance = this;
        this.collection = "log_data";
    }

    create(document) { return database.create(this.collection, document) }

    getById(id) { return database.get(this.collection, id) }

    gettotalrecordscount(){return database.getTotalRecordCount(this.collection)}

}

module.exports = new LogDataModel();