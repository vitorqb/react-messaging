import * as R from 'ramda';

/**
 * A class responsible for managing all the application subscriptions.
 */
export default class SubscriptionManager {

  constructor() {
    this._subscriptions = [];

    // Bind everything (because js is js)
    this.popSubscription = this.popSubscription.bind(this);
    this.addSubscription = this.addSubscription.bind(this);
    this.subscribeFnGenerator = this.subscribeFnGenerator.bind(this);
    this.isSubscribed = this.isSubscribed.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
  }

  // Helpers for subscriptions
  popSubscription(widgetId, messageType) {
    const index = [widgetId, messageType];
    delete this._subscriptions[index];
   }

  addSubscription(widgetId, messageType, sendMsgFn) {
    const index = [widgetId, messageType];
    this._subscriptions[index] = sendMsgFn;
  }

  isSubscribed(widgetId, messageType) {
    const index = [widgetId, messageType];
    return ! R.isNil(this._subscriptions[index]);
  }

  /**
   * Generates a function that can be used by a widget to subscribe to a specific message type.
   * @param widgetId - Id of the widget that wants to subscribe itself.
   * @return - A function that accepts `messageType`, being the type of message that the widget
   *           wants to receive, and `sendMsgFn`, a callback function to handle the message.
   */
  subscribeFnGenerator(widgetId) {
    const self = this;
    return function subscribeToWidgetId(messageType, sendMsgFn) {
      console.log(`Subscribing ${widgetId} to ${messageType}`);
      self.addSubscription(widgetId, messageType, sendMsgFn);
    };
  }

  sendMsg(msg) {
    const widgetId = msg.targetId;
    const messageType = msg.messageType;
    const index = [widgetId, messageType];
    const sendMsgFn = this._subscriptions[index];
    if (!R.isNil(sendMsgFn)) {
      console.log("Sending msg", msg);
      sendMsgFn(msg);
    }
  }

}
