import Emitter from "./../utils/Emitter";

/**
 * @param {Number|null} delay If this value is defined, the timeline will wait before executing the event
 * @param {Number|null} duration If this is value is defined, this event will be executed each time while the duration is not passed
 * @param {Object} datas A object to defined the event
 */
export default class TimelineEvent extends Emitter {
  constructor({
    timecode = null,
    duration = 0,
  } = {}, datas){
    super();
    this.timecode = timecode;
    this.datas = datas;
    this.delay = delay;
    this.duration = duration;
    this.count = 0;
  }

  log(){
    return `(${this.timecode}) TimelineEvent: ${this.datas.name ? this.datas.name : 'Anonyme'}; Number of execution: ${this.count}`
  }
}