const controller = require('../controller/api_test_controller')
const config = require('../config')

module.exports = exports = function (options) {
	'use strict';
	var app = options.app;
	app.get('/apitest/gettotalrecordscount', controller.gettotalrecordscount);
	app.get('/apitest/getById', controller.getById);
	app.get('/apitest/emptyapicall', controller.emptyapicall);
	app.post('/apitest', controller.create);
	app.post('/apitest/publishmessage', controller.publishmessage)
};