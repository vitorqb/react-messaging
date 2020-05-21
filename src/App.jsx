import './App.css';
import Widget from './Widget.jsx';
import React from 'react';
import SubscriptionManager from './SubscriptionManager.js';


// Some constants and messages examples for the demo
const widgetId = "id1";
const increaseByMsg = {
  targetId: widgetId,
  messageType: "increaseBy",
  payload: 1
};
const decreaseByMsg = {
  targetId: widgetId,
  messageType: "decreaseBy",
  payload: 1
};
const resetMsg = {
  targetId: widgetId,
  messageType: "reset"
};

// The subscription manager
let subscriptionManager = new SubscriptionManager();

function App() {
  return (
    <div className="App">
      <Widget subscribe={subscriptionManager.subscribeFnGenerator(widgetId)}/>
      <div>
        <button onClick={_ => subscriptionManager.sendMsg(increaseByMsg)}>
          Increase
        </button>
        <button onClick={_ => subscriptionManager.sendMsg(decreaseByMsg)}>
          Decrease
        </button>
        <button onClick={_ => subscriptionManager.sendMsg(resetMsg)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
