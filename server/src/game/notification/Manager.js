import Emitter from '@solaldr/emitter';
import notifications from './list';
import Notification from './Notification';

class NotificationManager extends Emitter {
  constructor({
    game = null,
  } = {}) {
    super();
    this.notifications = [];
    notifications.forEach((notif) => {
      const constraint = game.constraintManager.get(notif.constraint);
      const notification = new Notification({
        ...notif,
        constraint,
      });

      notification.on('send', (message) => {
        this.emit('notification:send', message);
      });

      this.notifications.push(notification);
    });
  }

  get infos() {
    return {};
  }
}

export default NotificationManager;
