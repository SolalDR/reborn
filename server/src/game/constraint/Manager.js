import Emitter from '../../../../reborn/utils/Emitter';
import Constraint from './Constraint';
import constraints from "./list";

/**
 * @extends Emitter
 * @class ConstraintManager
 */
class ConstraintManager extends Emitter {
  constructor({
    game = null
  }) {
    super();
    this.game = game;
    this.constraints = new Map();
    constraints.forEach(constraint => {
      this.constraints.set(constraint.slug,  new Constraint(constraint));
    });
  }

  /**
   * Check all the constraint, this method is called in the timeline:tick
   */
  checkConstraints({
    metrics = null
  }) {
    this.constraints.forEach(constraint => {
      constraint.check(this.game);
    });
  }

  get infos(){
    return {
      game: this.game
    };
  }
}

export default ConstraintManager;
