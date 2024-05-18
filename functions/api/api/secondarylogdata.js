const controller = require('../controller/secondary_log_data_controller')
const config = require('../config')

module.exports = exports = function (options) {
	'use strict';
	var app = options.app;
	app.get('/secondarylogdata/gettotalrecordscount', controller.gettotalrecordscount);
};