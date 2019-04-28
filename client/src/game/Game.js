import * as Reborn from '../../../reborn';
import store from '../services/store';

/**
 * @extends Reborn.Game
 * @property {Reborn.EntityModel} currentModel
 */
export default class Game extends Reborn.Game {
  constructor({
    players = null,
    seed = null,
  } = {}) {
    super({ players, seed });
    this.currentModel = null;
    this.clusters = null;
  }

  get player() {
    return this.players.find(p => p.id === store.state.playerId);
  }
}
