import Metric from "./Metric";

/**
 * Energy metric
 * @extends Metric
 */
export default class Waste extends Metric {
  constructor(){
    super({
      name: "Waste",
      displayName: "Déchets",
      min: 0,
      max: 100,
      value: 0,
      recurentOperation: 0,
    })
  }

  applyRecurentLogic(game) {
    var addWaste = Math.random() < this.value / 100;
    if (addWaste) {
      console.log('Add waste');
      var cell = null;
      while (!cell) {
        const gridCase = game.world.grid[Math.floor(Math.random()*game.world.grid.length)];
        if (gridCase !== null && gridCase.reference === null) {
          cell = gridCase
        }
      }

      game.world.addEntity({
        gridCases: [gridCase],
        model = 'waste',
        position = null,
        rotation = null,
      });
    }
  }
}
