import * as Reborn from "./../../../reborn"

class Player extends Reborn.Player {
  /**
   * @constructor
   * @param {Socket} clientSocket The socket id in the room
   * @param {Socker} socket The socket connection of the player
   */
  constructor(clientSocket, socket){
    super({
      id: clientSocket.id,
    });
    this._client = clientSocket;
    this.socket = socket;
    this.ready = false;
  }
}

export default Player;
