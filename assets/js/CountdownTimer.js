// CountdownTimer.js
// ------------------------------------------------------------------
//
// created: Mon Jan 22 14:39:37 2018
// last saved: <2018-February-13 10:04:51>

'use strict';

function CountdownTimer(durationInMilliseconds, granularity) {
  this.durationInMilliseconds = durationInMilliseconds;
  this.granularity = granularity || 250;
  this.tickFns = [];
  this.expiredFns = [];
  this.running = false;
  this.timeoutId = null;
}

CountdownTimer.prototype.stop = function() {
  if (this.running || this.timeoutId) {
    if (this.timeoutId) { clearTimeout(this.timeoutId); }
    this.running = false;
  }
  return this;
};

CountdownTimer.prototype.start = function() {
  if (this.running) {
    return this;
  }
  this.running = true;
  var start = Date.now(),
      that = this,
      diffMs, obj;

  (function internalTick() {
    diffMs = that.durationInMilliseconds - (((Date.now() - start)) | 0);

    if (diffMs > 0) {
      that.timeoutId = setTimeout(internalTick, Math.min(diffMs, that.granularity));
      that.tickFns.forEach(function(fn) {
        fn.call(this, diffMs);
      }, that);
    }
    else {
      diffMs = 0;
      that.running = false;
      that.expiredFns.forEach(function(fn) {
        fn.call(this, diffMs);
      }, that);
    }
  }());
  return this;
};

CountdownTimer.prototype.onTick = function(fn) {
  if (typeof fn === 'function') {
    this.tickFns.push(fn);
  }
  return this;
};

CountdownTimer.prototype.onExpired = function(fn) {
  if (typeof fn === 'function') {
    this.expiredFns.push(fn);
  }
  return this;
};

CountdownTimer.prototype.isExpired = function() {
  return !this.running;
};
