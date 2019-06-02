import { Skill } from '../../../reborn';

export default class EarthquakeSkill extends Skill {
  constructor(descriptor) {
    super(descriptor);
  }

  start(item, game) {
    var isStarted = super.start();
    if (!isStarted) return;
    const cells = game.world.grid.captureZone(item.position, this.zoneRadius);

    cells.forEach(gridCase => {
      if (gridCase && gridCase.reference) {
        const reference = gridCase.reference;
        const timeout = Math.random()*this.duration;
        setTimeout(() => {
          const entity = game.world.entities.get(gridCase.reference);
          if (entity) {
            game.world.removeEntity(entity);
          }
        }, timeout)
      }
    })
    this.checkAvailable();
  }
}
