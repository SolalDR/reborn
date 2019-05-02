import * as Reborn from "../../../reborn";
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

    var timeRatio = 250/1000;


    var metricsMap = Array.from(this.metrics.values());
    this.timeline.on('tick', () => {
      this.metrics.forEach(metric => {
        metric.value += metric.recurentOperation * timeRatio;
      });
      this.emit('tick', {
        metrics: metricsMap.map(m => m.infos),
        elapsed: Date.now() - this.startedAt
      });
    })
  }

  /**
   * @override
   */
  initWorld() {
    this.world = new World({
      game: this,
    });
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
