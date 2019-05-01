import * as Reborn from '../../../reborn';
import store from '../services/store';
import AssetsManager from '../services/assets/Manager';

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

    AssetsManager.loader.addGroup({
      name: 'models',
      base: '/3d/models/',
      files: Reborn.models.map(({ slug }) => ({
        name: slug,
        path: `${slug}.glb`,
      })),
    });

    AssetsManager.loader.loadGroup('models');
  }

  get player() {
    return this.players.find(p => p.id === store.state.playerId);
  }
}
