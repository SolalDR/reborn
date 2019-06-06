import models from '../entity/models';
/**
 * @class Represent a player role
 * @abstract
 * @param {String} name
 */
export default class Role {
  constructor(name) {
    this.name = name;
    this.quests = [];
  }

  get models() {
    return models.filter(m => m.role === this.name);
  }
}
