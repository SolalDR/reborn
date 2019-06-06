import Emitter from '../reborn/utils/Emitter';

export default class Historic extends Emitter {
  constructor() {
    super();
    this.entries = [];
  }

  addEntry(type, eventName, datas) {
    const entry = {
      datas,
      date: new Date(),
      eventName,
      type,
    };

    this.entries.push(entry);
    this.emit('update', entry);
  }
}
