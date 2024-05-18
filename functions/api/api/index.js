const logdata = require('./logdata')
const secondarylogdata = require('./secondarylogdata')
const apitest = require('./apitest')
module.exports = exports = function (options) {
    logdata({ app: options.app });
    secondarylogdata({ app: options.app });
    apitest({ app: options.app });
};
