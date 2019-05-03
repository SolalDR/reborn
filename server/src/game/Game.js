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

    // Timeline
    this.timeline = new Timeline({
      interval: 250,
    });

    // ConstraintManager
    this.constraintManager = new ConstraintManager({
      game: this
    });

    // NotificationManager
    // TODO: Start listening this.constraintManager events
    this.notificationManager = new NotificationManager({
      socket: this.socket
    });
    this.initNotificationListener();

    // Tick
    const metricsMap = Array.from(this.metrics.values());
    this.timeline.on('tick', ()=>{
      this.constraintManager.checkConstraints();

      this.metrics.forEach(metric => {
        metric.value += metric.recurentOperation;
      });

      this.emit('tick', {
        metrics: metricsMap.map(m => m.infos)
      });

      this.constraintManager.checkConstraints({
        metrics: metricsMap.map(m => m.infos)
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

  initNotificationListener() {
    // TODO: Listen to events from this.constraintManager
  }
}
