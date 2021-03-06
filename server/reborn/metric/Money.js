import Metric from './Metric';

/**
 * Money metric
 * @extends Metric
 */
export default class Money extends Metric {
  constructor() {
    super({
      name: 'Money',
      displayName: 'Ressources',
      slug: 'money',
      min: 0,
      max: Infinity,
      value: 0,
      recurentOperation: 0,
      inclusiveSet: false,
    });
  }
}
