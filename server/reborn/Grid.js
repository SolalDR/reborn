import GridCase from "./GridCase";
/**
 * @class Represent the world grid
 * @extends Array
 * @param {Integer[]} size The size of the grid (default is [32, 32])
 */
export default class Grid extends Array {
  constructor({
    size = [32, 32]
  } = {}){
    super(size[0]*size[1]);
    this.fill(null);
    this.size = size;
  }

  /**
   * Register a new grid case
   */
  register(index, value = null) {
    this[index] = value ? new GridCase(
      Math.floor(index / this.size[0]),
      index % this.size[1],
      value) : null;
  }

  /**
   * Check if an area is already reserved to an element
   * @param {Integer[]} position A vec2 defining the coords in the grid
   * @param {Integer[]} size An vec2 defining the size of the element
   * @returns {Boolean} Return true if there is space
   */
  checkSpace(position, size = {x: 1, y: 1}){
    for (var i=0; i<size.x; i++) {
      for (var j=0; j<size.y; j++) {
        if (this.get(position)) {

        }
      }
    }

    return true;
  }

  /**
   * A getter method
   * @param {Integer} x
   * @param {Integer} y
   * @return {null|Entity}
   */
  get(coord) {
    return this[coord.x*this.size[0] + coord.y];
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

  /**
   * Rerturn the content of all the grid formated for socket transmission
   * @return {Array}
   */
  get infos() {
    var grid = [];
    this.forEach(item => {
      if (item instanceof GridCase) {
        grid.push(item.infos);
      } else if(item === null) {
        grid.push(null);
      }
    })
    return grid;
  }
}
