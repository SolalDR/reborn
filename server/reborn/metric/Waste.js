import Metric from './Metric';

/**
 * Energy metric
 * @extends Metric
 */
export default class Waste extends Metric {
  constructor() {
    super({
      name: 'Waste',
      displayName: 'Déchets',
      min: 0,
      max: 100,
      value: 0,
      recurentOperation: 0,
    });
  }

  applyRecurentLogic(game) {
    const addWaste = Math.random() < this.value / 100;
    if (addWaste) {
      let cell = null;
      let gridCase = null;
      while (!cell) {
        gridCase = game.world.grid[Math.floor(Math.random() * game.world.grid.length)];
        if (gridCase !== null && gridCase.reference === null) {
          cell = gridCase;
        }
      }

      if (!gridCase) {
        console.warn('Not enough place');
        return;
      }

      game.world.addEntity({
        gridCases: [gridCase],
        model: 'waste',
        position: game.world.grid.getGridCasePosition(gridCase),
        rotation: 0,
      });
    }
  }
}
