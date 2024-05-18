const controller = require('../controller/log_data_controller')
const config = require('../config')

module.exports = exports = function (options) {
	'use strict';
	var app = options.app;

	// Fetching all records
	app.get('/logdata/batchinsertdata', controller.batchinsertdata);

	app.get('/logdata/gettotalrecordscount', controller.gettotalrecordscount);

	app.get('/logdata/helloworld', controller.helloworld);
};