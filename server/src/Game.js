import * as Reborn from "../../reborn";
import Emitter from "../../reborn/utils/Emitter";

export default class Game extends Emitter {
  constructor(players, socket){
    super();
    this.players = players;
    this.socket = socket;
    this.timeline = new Reborn.Timeline({
      interval: 250
    });
    
    this.timeline.on('tick', (events)=> {
      console.log('Timeline Tick', this.timeline.time);
      events.forEach(event => event.log())
    });

    this.assignRoles();
  }

  assignRoles(){
    const playersList = this.playersList;
    const playerNature = this.players.get(playersList.map(p => p.id)[Math.floor(Math.random()*2)]);
    playerNature.assignRole(Reborn.NatureRole);

    const playerCity = playersList.find(p => p.id !== playerNature.id);
    playerCity.assignRole(Reborn.CityRole);
  }

  start() {
    this.emit('start', this.infos);
  }

  get playersList(){
    return Array.from(this.players.values());
  }

  get infos(){
    return {
      players: this.playersList.map(player => player.infos)
    }
  }
}