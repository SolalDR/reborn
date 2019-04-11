import * as Reborn from '../../../reborn';
import store from '../services/store';

export default class Game extends Reborn.Game {
  constructor({
    players = null,
  } = {}) {
    super({ players });
  }

  get player() {
    return this.players.find(p => p.id === store.state.playerId);
  }
}
