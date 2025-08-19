import { peek, push, pop } from "./minHeap";

let taskQueue = [];

let taskIdCounter = 0;

const channel = new MessageChannel();

const port = channel.port1;
const port2 = channel.port2;

port.onmessage = function (event) {
  workLoop();
};

function scheduleCallback(callback) {
  let startTime = getCurrentTime();
  let timeOutTime = -1;
  const expirationTime = startTime - timeOutTime;
  const newTask = {
    id: taskIdCounter++,
    sortIndex: expirationTime,
    callback,
    expirationTime,
  };
  push(taskQueue, newTask);

  requestHostCallback();
}

function requestHostCallback() {
  port2.postMessage(null);
}

function getCurrentTime() {
  return performance.now();
}

function workLoop() {
  let currentTask = peek(taskQueue);
  while (currentTask) {
    const { callback } = currentTask;
    currentTask.callback = null;
    callback();
    pop(taskQueue);
    currentTask = peek(taskQueue);
  }
}

export { scheduleCallback };
