export default class Grid extends Array{
  constructor({
    size = [32, 32]
  } = {}){
    super(size[0]*size[1]);
    this.size = size;
  }

  checkSpace(position, entityModel){
    return true;
  }

  get(x, y) {
    return this._grid[x*this.size[0] + y];
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
