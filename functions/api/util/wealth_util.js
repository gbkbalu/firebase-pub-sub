// Here, we are implementing the class with Singleton design pattern
class WealthUtil {
    constructor() {
        if (this.instance) return this.instance;
        WealthUtil.instance = this;
        const { PubSub } = require("@google-cloud/pubsub");
        this.pubsub = new PubSub();
    }

    publishMessageToTopic(topicName, message) {
        try {
            console.log("publishing message:", new Date());
            console.log("publishing message topic name:", topicName);
            this.pubsub
                .topic(topicName, { autoCreate: true }).publishMessage({ data: Buffer.from(JSON.stringify(message), 'utf8') })
            console.log("message published successfully!::", topicName)
        } catch (error) {
            console.error(error)
        }
        return;
    }

}

module.exports = new WealthUtil();