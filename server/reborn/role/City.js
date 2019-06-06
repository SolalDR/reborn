import Role from './Role';

/**
 * @class
 * @extends Role
 */
export default new class CityRole extends Role {
  constructor() {
    super('city');
    this.gauges = ['food', 'energy', 'satisfaction'];
    this.indicators = ['money', 'population'];
  }
}();
