import Metric from './Metric';

/**
 * Biodiversity metric
 * @extends Metric
 */
export default class Biodiversity extends Metric {
  constructor(game) {
    super({
      name: 'Biodiversity',
      displayName: 'Biodiversité',
      slug: 'biodiversity',
      min: 0,
      max: 100,
      value: 1,
      recurentOperation: 0,
    });

    this.models = Array.from(game.entityModels.values())
      .filter(entityModel => entityModel.role === 'nature');
  }

  computeEquartType() {
    const average = this.models.reduce((acc, model) => {
      return acc + model.count;
    }, 0) / this.models.length;

    const value = this.models.reduce((acc, model) => {
      return acc + (model.count - average) ** 2;
    }, 0);

    return value / this.models.length;
  }

  applyRecurentLogic() {
    let modelMax = this.models[0];
    let malus = 0;
    this.models.forEach((model) => {
      if (model.count > modelMax.count) modelMax = model;
      if (model.count === 0) malus -= 3;
    });

    let value = 0;
    this.models.forEach((model) => {
      value += (modelMax.count - model.count) ** 2;
    });

    value = Math.sqrt(value);

    // let value2 = 0;
    // this.models.forEach((model) => {
    //   value2 += Math.abs(modelMax.count - model.count);
    // });

    this.value = 100 - value + malus;
  }
}
