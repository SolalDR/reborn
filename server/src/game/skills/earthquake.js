import { Skill } from '../../../reborn';

/**
 * @constructor
 * @param {Object} descriptor
 */
export default class EarthquakeSkill extends Skill {
  start(item, game) {
    const isStarted = super.start();
    if (!isStarted) return;
    const size = game.world.entities.size;
    const stepDuration = this.duration / size;
    const natureDestroyProbability = game.metrics.get('purity').value / 100;
    const cityDestroyProbability = 1 - natureDestroyProbability;

    let index = 0;
    game.world.entities.forEach((entity) => {
      const reference = entity.uuid;
      setTimeout(() => {
        const actualEntity = game.world.entities.get(reference);
        if (actualEntity) {
          const proba = entity.model.role === 'nature'
            ? natureDestroyProbability
            : cityDestroyProbability;

          if (Math.random() < proba) game.world.removeEntity(entity);
        }
      }, index * stepDuration);
      index++;
    });
    this.checkAvailable();
  }
}
