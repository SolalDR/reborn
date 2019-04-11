import * as Reborn from '../../../reborn';

export default class Game extends Reborn.Game {
  constructor({ players = null } = {}) {
    super({ players });

    console.log(this);
  }
}
