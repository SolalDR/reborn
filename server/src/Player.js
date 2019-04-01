/**
 * Represent a player
 * @param {string} id
 * @param {Role} role
 * @param {Integer} status A status that defined the current activity of the player <br>
 * - Player.ACTIVE = 1<br>
 * - Player.ABSENT = 2
 */
class Player {
  /**
   * @constructor
   * @param {Socket} clientSocket The socket id in the room
   * @param {Socker} socket The socket connection of the player
   */
  constructor(clientSocket, socket){
    this._client = clientSocket;
    this.socket = socket;
    this.id = this._client.id;
    this.role;
    this.status = Player.ACTIVE;
  }

  /**
   * Assign a role to the user
   * @param {Reborn.Role} role
   */
  assignRole(role){
    this.role = role;
  }

  /**
   * Returns infos
   * @returns {id: string, role: Role, status: Integer}
   */
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
