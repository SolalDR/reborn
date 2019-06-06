import Metric from './Metric';
import models from '../entity/models';

/**
 * Energy metric
 * @extends Metric
 */
export default class Tree extends Metric {
  constructor() {
    super({
      name: 'Tree',
      displayName: 'Arbres',
      slug: 'tree',
      min: 0,
      value: 0,
      recurentOperation: 0,
    });

    this.list = models.reduce((acc, model) => {
      if (model.category == 'plant' || model.category == 'tree') {
        acc.push(model.slug);
      }
      return acc;
    }, []);
  }

  applyRecurentLogic(game) {
    this.value = this.list.reduce((value, model) => {
      return value + game.entityModels.get(model).count;
    }, 0);
  }
}
