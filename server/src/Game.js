import {NatureRole, CityRole} from "./role"

export default class Game {
  constructor(players, socket){
    this.players = players;
    this.assignRoles();
  }

  assignRoles(){
    const playersList = Array.from(this.players.values());
    const playerNature = this.players.get(playersList.map(p => p.id)[Math.floor(Math.random()*2)]);
    playerNature.assignRole(NatureRole);

    const playerCity = playersList.find(p => p.id !== playerNature.id);
    playerCity.assignRole(CityRole);

    this.start()
  }

  start() {
    console.log('Start Game')
  }
}