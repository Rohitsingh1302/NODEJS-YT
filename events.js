const events = require("events");
const eventEmitter = new events.EventEmitter();

// Event handler
const myEvent = () => {
  console.log("Event triggered");
};

// Event register
eventEmitter.on("hello", myEvent);

// Event call
eventEmitter.emit("hello");
