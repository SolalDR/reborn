import { Skill } from '../../../reborn';

export default class EarthquakeSkill extends Skill {
  constructor(descriptor) {
    super(descriptor);
  }

  start(item, game) {
    var isStarted = super.start();
    if (!isStarted) return;
    const size = game.world.entities.size;
    const stepDuration = this.duration / size;
    const natureDestroyProbability = game.metrics.get('purity').value / 100;
    const cityDestroyProbability = 1 - natureDestroyProbability;

    let index = 0;
    const cells = game.world.entities.forEach((entity) => {
      const reference = entity.uuid;
      setTimeout(() => {
        const entity = game.world.entities.get(reference);
        if (entity) {
          const proba = entity.model.role === 'nature'
            ? natureDestroyProbability
            : cityDestroyProbability

          if (Math.random() < proba) game.world.removeEntity(entity);
        }
      }, index*stepDuration);
      index++;
    });
    this.checkAvailable();
  }
}
