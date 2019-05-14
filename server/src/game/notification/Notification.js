import Emitter from "@solaldr/emitter";

/**
 * Represent a notification
 * @param {string} id
 */
class Notification extends Emitter {

  /**
   * @constructor
   */
  constructor({
    constraint = null,
    regularOrder = true,
    role = null,
    messages = [],
  } = {}) {
    super();
    this.constraint = constraint;
    this.regularOrder = regularOrder;
    this.role = role;
    this.messages = messages.map(message => {
      return {
        count: 0,
        repeat: null,
        ...message,
      }
    });

    this.initEvents();
  }

  initEvents() {
    this.constraint.on('change', ({ regularOrder }) => {
      if (regularOrder === this.regularOrder) {
        const message = this.selectNextMessage();
        if (message) {
          this.emit('send', message);
        }
      }
    })
  }

  selectNextMessage() {
    var minCount = Infinity;
    this.messages.forEach(message => {
      if (message.count < minCount) {
        minCount = message.count;
      }
    });

    var availables = this.messages.filter(message => {
      return message.count === minCount && (!message.repeat || message.count < message.repeat);
    })

    var message = availables[Math.floor(Math.random()*availables.length)];
    return message ? message : null;
  }

  /**
   * Returns infos
   * @returns {name: string, content: string, targetRole: Role, constraints: Object}
   */
  get infos(){
    return {
      name: this.name,
      content: this.content,
      targetRole: this.targetRole ? this.targetRole.name : null,
      constraints: this.constraints
    };
  }
}

export default Notification;
