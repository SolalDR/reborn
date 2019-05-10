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
    this.notificationManager = new NotificationManager({
      game: this,
    });

    var timeRatio = 250/1000;
    const metricsMap = Array.from(this.metrics.values());
    this.timeline.on('tick', () => {
      this.constraintManager.checkConstraints();

      this.metrics.forEach(metric => {
        metric.value += metric.recurentOperation * timeRatio;
      });

      this.emit('tick', {
        metrics: metricsMap.map(m => m.infos),
        elapsed: Date.now() - this.startedAt
      });
    })

    this.initEvents();
  }

  /**
   * @override
   */
  initWorld() {
    this.world = new World({
      game: this,
    });
  }

  initEvents() {
    this.constraintManager.get('end-game').on('change', () => {
      this.finish();
      this.timeline.stop();
    })
  }

  start() {
    super.start();
    this.startedAt = Date.now() + 7000;

    var timeout = this.startedAt - Date.now();
    setTimeout(() => {
      this.timeline.start();
    }, timeout);
  }

  assignRoles(){
    const playersList = this.playersList;
    const playerNature = this.players.get(playersList.map(p => p.id)[Math.floor(Math.random()*2)]);
    playerNature.assignRole(Reborn.NatureRole);

    const playerCity = playersList.find(p => p.id !== playerNature.id);
    playerCity.assignRole(Reborn.CityRole);
  }
}
