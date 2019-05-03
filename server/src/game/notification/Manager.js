import notifications from './list';
import Notification from './Notification';

class NotificationManager {
  constructor({
    socket = null
  }) {
    this.socket = socket;
    this.notifications = [];
    notifications.forEach(notification => {
      this.notifications.push(new Notification(notification));
    });
  }

  triggerNotification(notification) {
    this.socket.emit('notification:trigger', notification);
    console.log('TRIGGER:', notification);
  }

  get infos(){
    return {
      socket: this.socket
    };
  }
}

export default NotificationManager;
