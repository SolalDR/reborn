import * as Reborn from '../../../reborn';
import store from '../services/store';

/**
 * @extends Reborn.Game
 * @property {Reborn.EntityModel} currentModel
 */
export default class Game extends Reborn.Game {
  constructor({
    players = null,
  } = {}) {
    super({ players });
    this.currentModel = null;
  }

  get player() {
    return this.players.find(p => p.id === store.state.playerId);
  }
}
