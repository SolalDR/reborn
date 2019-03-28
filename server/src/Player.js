import Bus from "./Bus";


class Player {
  constructor(clientSocket, socket){
    this._client = clientSocket;
    this.socket = socket;
    this.id = this._client.id;
    this.role;
    this.status = Player.ACTIVE;
  }

  assignRole(role){
    this.role = role;
  }

  get infos(){
    return {
      id: this.id,
      role: this.role,
      status: this.status
    }
  }
}

Player.ACTIVE = 1;
Player.ABSENT = 2;

export default Player;