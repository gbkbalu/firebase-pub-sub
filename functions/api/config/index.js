'use strict';
var _ = require('lodash');
// All configurations will extend these options
// ============================================
var all = {
  BATCH_SIZE : 300,
  TOPIC_NAME : "wealthupp-pub-event"
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(all);