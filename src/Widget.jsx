import React, { useState, useEffect } from 'react';

export default function Widget(props) {

  // State!
  const [counter, setCounter] = useState(0);

  // Message Handlers
  function handleIncreaseBy(msg) { setCounter(x => x + msg.payload ); }
  function handleDecreaseBy(msg) { setCounter(x => x - msg.payload ); }
  function handleReset(msg) {
    alert("Ressetting!");
    setCounter(0);
  }

  // Messaging subscription
  useEffect(() => {
    props.subscribe('increaseBy', handleIncreaseBy);
    props.subscribe('decreaseBy', handleDecreaseBy);
    props.subscribe('reset', handleReset);
  });

  // Render
  return (
    <div>
      <span>{`Counter: ${counter}`}</span>
    </div>
  );

}
