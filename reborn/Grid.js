class Grid extends Array{
  constructor({
    size = [32, 32]
  } = {}){
    super(xSize*ySize);
    this.size = size;
  }

  get(x, y) {
    return this._grid[x*this.size[0] + this.size[1]];
  }
}
