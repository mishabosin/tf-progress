var events = require('events');

var EVENTS = {
  START: 'start',
  END: 'end',
  PROGRESS: 'progress'
};

var Progress = function() {
  this.emitter = new events.EventEmitter();
  this.steps = 0;
};

Progress.prototype.onStart = function (callback) {
  this.emitter.on(EVENTS.START, callback);
};

Progress.prototype.onEnd = function (callback) {
  this.emitter.on(EVENTS.END, callback);
};

Progress.prototype.onProgress = function (callback) {
  this.emitter.on(EVENTS.PROGRESS, callback);
};

Progress.prototype.start = function () {
  var emitter = this.emitter;
  emitter.emit(EVENTS.START);
  var self = this;

  var intervalId = setInterval(function progress() {
    emitter.emit(EVENTS.PROGRESS, self.steps);
    self.steps ++;
    if (self.steps === 10) {
      clearInterval(intervalId);
      emitter.emit(EVENTS.END);
    }
  }, 300);
};

var myProgress = new Progress();
myProgress.onStart(function () {
  console.log('Started');
});
myProgress.onEnd(function () {
  console.log('End');
});
myProgress.onProgress(function (step) {
  console.log('Progressed to step: ', step);
});

myProgress.start();
