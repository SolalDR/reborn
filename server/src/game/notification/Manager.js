class NotificationManager {
  constructor({
    socket = null
  }) {
    this.socket = socket;
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
