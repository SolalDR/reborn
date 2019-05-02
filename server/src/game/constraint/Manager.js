import Emitter from '../../../../reborn/utils/Emitter';
import constraints from "./list"

class ConstraintManager extends Emitter {
  constructor({
    game = null
  }) {
    super();
    this.game = game;
    this.constraintMetrics = constraints.map(constraint => constraint.metrics)
  }

  checkConstraints({
    metrics = null
  }) {
    this.constraintMetrics.forEach(constraint => {
      console.log('CONSTRAINTS METRICS');
      console.log(constraint);

      // constraint.metrics.forEach(constraintMetrics => {
        // console.log(metrics.filter(metric => metric.slug === constraintMetrics.slug && metric.value < 20));
      // });
    });

    // TODO: Emit 'constraint:validated' once
  }

  get infos(){
    return {
      game: this.game
    };
  }
}

export default ConstraintManager;
