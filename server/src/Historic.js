import Emitter from "./../../reborn/utils/Emitter";

export default class Historic extends Emitter {
  constructor() {
    super();
    this.entries = [];
  }

  addEntry (type, entryContent) {
    const entry = {
      content: entryContent,
      date: new Date(),
      type: type
    };

    this.entries.push(entry);
    this.emit('update', entry);
  }
}
