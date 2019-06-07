import Emitter from '@solaldr/emitter';
import TimelineEvent from './Event';

export default class Timeline extends Emitter {
  constructor({
    interval = null,
  } = {}) {
    super();
    this.time = 0;
    this.interval = interval;
    this.events = new Map();
  }

  /**
   * start the timeline
   */
  start() {
    this.timestamp = Date.now();
    this.tick = setInterval(() => {
      const now = Date.now();
      this.time += now - this.timestamp;
      this.timestamp = now;
      const eventsFired = [];
      this.events.forEach((event) => {
        if (event.timecode < this.time) {
          event.emit('complete', event.datas);
          event.count++;
          eventsFired.push(event);
          if (event.timecode + event.duration < this.time) {
            this.events.delete(event);
          }
        }
      });
      this.emit('tick', eventsFired);
    }, this.interval);
  }

  pause() {
    clearInterval(this.tick);
  }

  stop() {
    this.time = 0;
    clearInterval(this.tick);
  }

  /**
   * Add an event to the timeline
   * @param {Number} delay
   * @param {Number} duration
   * @param {Function} onComplete
   * @param {Object} datas
   */
  add({
    delay = 0,
    duration = 0,
    onComplete = null,
  }, datas) {
    const timelineEvent = new TimelineEvent({
      duration,
      timecode: this.time + delay,
    }, datas);

    this.events.set(Symbol('TimelineEvent'), timelineEvent);
    if (onComplete) timelineEvent.on('complete', onComplete);
    return timelineEvent;
  }
}
