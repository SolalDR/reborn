import Role from "./Role";

/**
 * @class
 * @extends Role
 */
export default new class NatureRole extends Role {
  constructor(){
    super('nature');
    this.gauges = ['biodiversity', 'purity'];
    this.indicators = [];
  }
}
