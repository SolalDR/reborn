import * as Reborn from "../../reborn"

export default class World extends Reborn.World {
  constructor({
    game = null
  } = {}) {
    super(arguments[0]);
  }
}
