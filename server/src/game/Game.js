import * as Reborn from "../../../reborn";

import ConstraintManager from './constraint/Manager';
import NotificationManager from './notification/Manager';
import World from "./World";
import Timeline from "./timeline/Timeline"

export default class Game extends Reborn.Game {
  constructor({
    players,
    socket,
    room
  } = {}){
    super({
      players,
    });
    this.room = room;
    this.socket = socket;
    this.assignRoles();

    // ConstraintManager
    this.constraintManager = new ConstraintManager({
      game: this
      // TODO: Bind constraints
    });

    // NotificationManager
    this.notificationManager = new NotificationManager({
      socket: this.socket
    });

    // Timeline
    this.timeline = new Timeline({
      interval: 250,
    });

    var metricsMap = Array.from(this.metrics.values());
    this.timeline.on('tick', ()=>{
      this.metrics.forEach(metric => {
        metric.value += metric.recurentOperation;
      });

      const tickArgs = metricsMap.map(m => m.infos);
      this.emit('tick', {
        metrics: tickArgs
      });
      this.constraintManager.checkConstraints(tickArgs);

      this.constraintManager.on('notification:trigger', notification => {
        this.notificationManager.triggerNotification(notification);
      });
    })
  }

  /**
   * @override
   */
  initWorld() {
    this.world = new World({
      game: this
    });
  }

  assignRoles(){
    const playersList = this.playersList;
    const playerNature = this.players.get(playersList.map(p => p.id)[Math.floor(Math.random()*2)]);
    playerNature.assignRole(Reborn.NatureRole);

    const playerCity = playersList.find(p => p.id !== playerNature.id);
    playerCity.assignRole(Reborn.CityRole);
  }
}
