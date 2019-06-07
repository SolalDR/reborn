import * as Reborn from '../../reborn';

export default class World extends Reborn.World {
  updateGrid(grid) {
    grid.forEach((item, index) => {
      this.grid.register(index, item);
    });
  }
}
