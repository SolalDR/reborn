import * as Reborn from "../../reborn";

export default class Game extends Reborn.Game {
  constructor({
    players,
    socket,
    room
  } = {}){
    super({
      players,
      interval: 250
    });
    this.room = room;
    this.socket = socket;
    this.assignRoles();
  }

  assignRoles(){
    const playersList = this.playersList;
    const playerNature = this.players.get(playersList.map(p => p.id)[Math.floor(Math.random()*2)]);
    playerNature.assignRole(Reborn.NatureRole);

    const playerCity = playersList.find(p => p.id !== playerNature.id);
    playerCity.assignRole(Reborn.CityRole);
  }
}
