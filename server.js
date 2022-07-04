const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// initial Object
const myEmitter = new MyEmitter();

// add listner for log event
myEmitter.on("log", (msg) => logEvents(msg));

// Emit Event
myEmitter.emit("log", "log emitted!");
