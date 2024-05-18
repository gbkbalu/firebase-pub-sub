'use strict';
var _ = require('lodash');
// All configurations will extend these options
// ============================================
var all = {
  BATCH_SIZE: 100,
  TOPIC_NAME: "wealthupp-pub-event",
  SECONDARY_PUBSUB_TOPIC: "secondary-pubsub-topic"
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(all);