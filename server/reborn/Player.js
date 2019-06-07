import * as roles from './role';
/**
 * Represent a player
 * @param {string} id
 * @param {Role} role
 * @param {Integer} status A status that defined the current activity of the player <br>
 * - Player.ACTIVE = 1
 * - Player.ABSENT = 2
 */
class Player {
  constructor({
    id = null,
    role = null,
    status = Player.ACTIVE,
  }) {
    this.id = id;
    this.status = status;
    this.assignRole(role);
  }

  /**
   * Assign a role to the user
   * @param {Reborn.Role} role
   */
  assignRole(role) {
    if (typeof role === 'string') {
      this.role = role === roles.NatureRole.name
        ? roles.NatureRole
        : roles.CityRole;
    } else {
      this.role = role;
    }
  }

  /**
   * Returns infos
   * @returns {{id: string, role: Role, status: Number}}
   */
  get infos() {
    return {
      id: this.id,
      role: this.role ? this.role.name : null,
      status: this.status,
    };
  }
}

Player.ACTIVE = 1;
Player.ABSENT = 2;

export default Player;
