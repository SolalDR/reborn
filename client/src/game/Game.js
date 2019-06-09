import * as Reborn from '../../../server/reborn';
import store from '../services/store';
import AssetsManager from '../services/assets/Manager';
import theme, { themeConfig } from '../config/theme';

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

    const themeRank = Math.floor((0.32152425412 * 10000) % 10);
    const t = themeConfig.themes[themeRank]
      ? themeConfig.themes[themeRank]
      : themeConfig.themes[0];
    theme.hydrate(t);

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
