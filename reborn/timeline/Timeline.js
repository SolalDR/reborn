import TimelineEvent from "./Event";
import Emitter from "./../utils/Emitter";

export default class Timeline extends Emitter {
  constructor({
    interval = null
  } = {}){
    super();
    this.time = 0;
    this.interval = interval;
    this.events = new Map();
    this.start();
  }

  start(){
    this.timestamp = Date.now();
    this.tick = setInterval(()=>{
      var now = Date.now();
      this.time += now - this.timestamp;
      this.timestamp = now;
      var eventsFired = [];
      this.events.forEach((event)=>{
        if( event.timecode < this.time ){
          event.emit('complete', event.datas);
          event.count++;
          eventsFired.push(event);
          if( event.timecode + event.duration < this.time ){
            this.events.delete(event);
          }
        }
      })
      this.emit('tick', eventsFired);
    }, this.interval)
  }

  pause() {
    clearInterval(this.tick);
  }

  stop() {
    this.time = 0;
    clearInterval(this.tick);
  }

  add({
    delay = 0,
    duration = 0,
    onComplete = null,
  }, datas){
    const timelineEvent = new TimelineEvent({
      duration,
      timecode: this.time + delay
    }, datas);

    this.events.set( Symbol('TimelineEvent'), timelineEvent );
    if( onComplete ) timelineEvent.on('complete', onComplete);
  }
}