/**
 * @class Represent the world grid
 * @extends Array
 * @param {Integer[]} size The size of the grid (default is [32, 32])
 */
export default class Grid extends Array{
  constructor({
    size = [32, 32]
  } = {}){
    super(size[0]*size[1]);
    this.fill(null);
    this.size = size;
  }

  /**
   * Check if an area is already reserved to an element
   * @param {Integer[]} position A vec2 defining the coords in the grid
   * @param {Integer[]} size An vec2 defining the size of the element
   * @returns {Boolean} Return true if there is space
   */
  checkSpace(position, size){
    return true;
  }

  /**
   * A getter method
   * @param {Integer} x
   * @param {Integer} y
   * @return {null|Entity}
   */
  get(x, y) {
    return this[x*this.size[0] + y];
  }

  /**
   * Set a value of a case
   * @param {Integer} x
   * @param {Integer} y
   * @param {Entity} entity
   */
  set(x, y, entity) {
    this._grid[x*this.size[0] + y] = entity;
  }
}
