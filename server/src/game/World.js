import * as Reborn from "../../reborn"

export default class World extends Reborn.World {
  constructor({
    game = null
  } = {}) {
    super(arguments[0]);
  }

  updateGrid(grid) {
    grid.forEach((item, index) => {
      this.grid.register(index, item);
    })

    console.log(grid);
  }
}
