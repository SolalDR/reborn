import {NatureRole, CityRole} from "./role"
import Event from "./utils/Event";

export default class Game extends Event {
  constructor(players, socket){
    super();
    this.players = players;
    this.socket = socket;
    this.assignRoles();
  }

  assignRoles(){
    const playersList = this.playersList;
    const playerNature = this.players.get(playersList.map(p => p.id)[Math.floor(Math.random()*2)]);
    playerNature.assignRole(NatureRole);

    const playerCity = playersList.find(p => p.id !== playerNature.id);
    playerCity.assignRole(CityRole);
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