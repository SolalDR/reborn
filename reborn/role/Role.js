/**
 * @class Represent a player role
 * @abstract
 * @param {String} name
 */
export default class Role {
  constructor(name){
    this.name = name;
    this.models = [];
    this.quests = [];
  }
}
